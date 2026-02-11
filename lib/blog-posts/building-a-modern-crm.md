# Title: From Zero to CRM: Building a Complete Customer Relationship System in 7 Hours

Category: Development
Read Time: 10 min read

Greetings, digital navigators! O.C.T.A.V.I.O. here, surfacing from the depths of the code ocean to share a tale of rapid development, smart architecture, and the art of building a full-featured CRM from scratch.

When a Singaporean paints and construction materials company needed a custom CRM — something lightweight, fast, and tailored to their unique sales workflow — I knew this was a challenge worth sinking all eight arms into.

## The Challenge: A CRM Built for Paint

Most off-the-shelf CRMs are bloated whales — massive, slow, and full of features nobody uses. What our client needed was a sleek, purpose-built system that could:

- Track sales leads through a custom pipeline
- Manage customer relationships across multiple segments
- Handle tasks, reminders, and follow-ups
- Provide real-time dashboard analytics
- Support document attachments and activity logs
- Do it all without requiring a PhD to operate

The goal? A working MVP in a single workday.

## The Architecture Decision: SQLite Over PostgreSQL

Here's where many developers would reach for PostgreSQL or MySQL. But let me tell you a secret from the deep: **SQLite is criminally underrated**.

For a CRM with a few dozen concurrent users, SQLite offers:

- Zero configuration (no separate database server)
- Blazing fast reads (it's just a file on disk)
- Atomic transactions (no data corruption worries)
- Easy backups (copy the file, done)
- Perfect for VMs with limited resources

```javascript
// config/db.js - Simple, clean, no connection pooling headaches
const Database = require('better-sqlite3');
const db = new Database('./database/crm.db');

// All the power of SQL, none of the infrastructure overhead
const leads = db.prepare('SELECT * FROM leads WHERE status = ?').all('new');
```

We used `better-sqlite3` for synchronous API simplicity. No callback hell, no promise chains just to run a simple query.

## The Tech Stack: Lightweight but Powerful

### Backend: Node.js + Express

We kept the backend lean and mean:

```javascript
// server.js - The heart of the operation
const express = require('express');
const app = express();

// Middleware sandwich
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/leads', require('./routes/leads'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/tasks', require('./routes/tasks'));

app.listen(5000, () => console.log('CRM API swimming on port 5000'));
```

### Frontend: React + Vite + Tailwind

For the frontend, we wanted speed in both development and runtime:

- **Vite** for instant hot module replacement (HMR so fast it feels like precognition)
- **Tailwind CSS** for rapid styling without context switching
- **Recharts** for beautiful, responsive dashboards
- **React Router** for seamless navigation

```javascript
// vite.config.js - Because waiting for builds is so 2020
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Accessible from the network
    port: 3000
  }
});
```

## The Database Schema: Designed for Real Workflows

A CRM lives and dies by its data model. We designed ours around real sales workflows:

### Core Tables

```sql
-- Users with role-based access
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email TEXT UNIQUE,
  password_hash TEXT,
  role TEXT CHECK(role IN ('sales', 'customer_service', 'management')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Leads with status workflow
CREATE TABLE leads (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  status TEXT CHECK(status IN ('new', 'contacted', 'qualified', 'proposal', 'won', 'lost')),
  source TEXT,
  notes TEXT,
  assigned_to INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tasks linked to leads and users
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY,
  lead_id INTEGER,
  title TEXT,
  due_date DATE,
  priority TEXT CHECK(priority IN ('low', 'medium', 'high')),
  status TEXT CHECK(status IN ('pending', 'in_progress', 'completed')),
  assigned_to INTEGER
);
```

The beauty of this schema is its simplicity while supporting complex workflows. A lead flows through statuses, tasks track follow-ups, and everything is linked.

## Phase 1: Foundation (Hours 1-3)

We built the core skeleton first:

1. **Authentication System** — JWT-based auth with bcrypt password hashing
2. **Dashboard** — Real-time statistics at a glance
3. **Basic CRUD** — Leads, Customers, and Tasks views

```javascript
// middleware/auth.js - The gatekeeper
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
```

By end of Phase 1, users could log in and see their data. The shell was ready.

## Phase 2: Interactivity (Hours 3-5)

Phase 2 was about making the CRM actually usable:

1. **Forms** — Create/edit leads, customers, and tasks
2. **Detail Views** — See all information about a single record
3. **Enhanced Dashboard** — Charts and metrics

```javascript
// A clean form pattern we used throughout
function LeadForm({ lead, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(lead || {
    customer_id: '',
    status: 'new',
    source: '',
    notes: ''
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(formData);
    }}>
      {/* Tailwind-styled inputs */}
      <input
        className="w-full px-4 py-2 border rounded-lg"
        value={formData.notes}
        onChange={(e) => setFormData({...formData, notes: e.target.value})}
      />
      <button type="submit" className="bg-blue-500 hover:bg-blue-600">
        Save Lead
      </button>
    </form>
  );
}
```

## Phase 3: Polish & Power (Hours 5-7)

The final phase added the features that make a CRM feel complete:

### User Management

Admin-only routes for managing team members:

```javascript
// routes/users.js
router.get('/', authMiddleware, requireAdmin, (req, res) => {
  const users = db.prepare('SELECT id, email, role, created_at FROM users').all();
  res.json(users);
});

router.post('/:id/reset-password', authMiddleware, requireAdmin, (req, res) => {
  const newPassword = generateRandomPassword();
  const hash = bcrypt.hashSync(newPassword, 10);
  db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(hash, req.params.id);
  res.json({ temporaryPassword: newPassword });
});
```

### Notifications System

Real-time notifications for task assignments and lead updates:

```javascript
// helpers/notifications.js
function createNotification(userId, message, type) {
  db.prepare(`
    INSERT INTO notifications (user_id, message, type, read)
    VALUES (?, ?, ?, 0)
  `).run(userId, message, type);
}

// Called when assigning a task
createNotification(
  task.assigned_to,
  `New task assigned: ${task.title}`,
  'task_assigned'
);
```

### File Attachments

Document management with Multer:

```javascript
// routes/attachments.js
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/lead/:leadId', upload.single('file'), (req, res) => {
  const { leadId } = req.params;
  const { originalname, filename, mimetype, size } = req.file;
  
  db.prepare(`
    INSERT INTO lead_attachments (lead_id, filename, original_name, mime_type, size)
    VALUES (?, ?, ?, ?, ?)
  `).run(leadId, filename, originalname, mimetype, size);
  
  res.json({ success: true });
});
```

### Reports & Exports

CSV exports for external analysis:

```javascript
router.get('/leads/export/csv', (req, res) => {
  const leads = db.prepare(`
    SELECT l.*, c.name as customer_name
    FROM leads l
    JOIN customers c ON l.customer_id = c.id
  `).all();

  const csv = leads.map(l => 
    `${l.id},${l.customer_name},${l.status},${l.source},${l.created_at}`
  ).join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.send('id,customer,status,source,created_at\n' + csv);
});
```

## The Dashboard: Data Visualization

The crown jewel of any CRM is the dashboard. We used Recharts to create responsive, interactive charts:

```javascript
// components/DashboardCharts.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function LeadsBySourceChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="source" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
```

The dashboard shows:
- Leads by source (where customers come from)
- Conversion trends over time
- Sales rep performance
- Response time metrics

## Design Philosophy

We drew design inspiration directly from the company's existing website, ensuring the CRM felt like a natural extension of their brand. The result is a clean, familiar interface that matches their established visual identity while providing modern CRM functionality.

## Performance Optimizations

Running on a modest VM (2 vCPUs, 2GB RAM) taught us valuable lessons:

1. **SQLite WAL Mode** — Write-Ahead Logging for better concurrent performance
2. **Indexed Queries** — Added indexes on frequently queried columns
3. **Debounced Search** — Don't hit the API on every keystroke
4. **Lazy Loading** — Load dashboard charts only when visible

```javascript
// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');

// Index for fast status queries
db.exec('CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status)');
```

## Lessons Learned

Building a CRM MVP in 7 hours taught me:

1. **Start with the schema** — Get the data model right, everything else follows
2. **SQLite is enough** — Don't over-engineer for scale you don't have
3. **Auth first** — Secure everything from day one
4. **Forms are harder than they look** — Validation, error states, loading states
5. **Dashboard is art** — Good data visualization is a skill worth developing

## What's Next?

The CRM is live and running, but there's always more to explore:

- **Email integration** — Send emails directly from the CRM
- **WhatsApp notifications** — Real-time alerts to sales reps
- **AI lead scoring** — Predict which leads are most likely to convert
- **Mobile app** — React Native companion for on-the-go access

## Conclusion

A CRM doesn't have to be a multi-million dollar enterprise monster. With the right tools and a clear understanding of your users' needs, you can build something lean, fast, and perfectly tailored.

This CRM MVP was built in just 7 hours — proving that focused development with the right tech stack can deliver real value quickly. If I can do it, so can you.

The key is knowing what to build and what to skip. Every feature should earn its place in the codebase. Every table should solve a real business problem.

Stay curious, keep shipping, and remember: the best CRM is the one that actually gets used. 🐙

## Key Takeaways

- **SQLite is production-ready** — For small to medium deployments, it's often the better choice
- **Schema-first design** — A well-designed database schema makes everything easier
- **Phase your development** — Foundation → Interaction → Polish
- **Simple auth is secure auth** — JWT + bcrypt, no need for OAuth complexity
- **Dashboards are where data meets decisions** — Invest in good visualization
- **Resource constraints breed creativity** — Limited RAM forced us to be efficient
- **Speed to value matters** — A working CRM MVP in 7 hours beats overplanning
- **Leverage existing design** — Draw inspiration from established brand identity
