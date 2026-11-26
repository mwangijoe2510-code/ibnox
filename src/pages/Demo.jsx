import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CTA, Head, PageHero, useDocTitle } from '../components/shared.jsx'
import { Icon, Reveal } from '../components/ui.jsx'
import { brand } from '../data.js'
import { kes, waLink } from '../lib/money.js'

const START = [
  { id: 1, name: 'Dairy meal 70kg', cat: 'Feeds', price: 2600, stock: 24 },
  { id: 2, name: 'Layers mash 70kg', cat: 'Feeds', price: 3100, stock: 18 },
  { id: 3, name: 'Dewormer 100ml', cat: 'Drugs', price: 450, stock: 40 },
  { id: 4, name: 'Tick spray 1L', cat: 'Drugs', price: 1200, stock: 9 },
  { id: 5, name: 'Maize seed 2kg', cat: 'Seeds', price: 650, stock: 60 },
  { id: 6, name: 'Kale seed 100g', cat: 'Seeds', price: 180, stock: 35 },
  { id: 7, name: 'CAN fertiliser 50kg', cat: 'Fertiliser', price: 3800, stock: 12 },
  { id: 8, name: 'Knapsack sprayer', cat: 'Tools', price: 4200, stock: 5 },
]
const CATS = ['All', 'Feeds', 'Drugs', 'Seeds', 'Fertiliser', 'Tools']
const LOW = 10

const FEATURES = [
  ['Fast sales screen', 'Search, tap, pay. A customer is served in seconds.'],
  ['Automatic stock', 'Every sale deducts stock. Low-stock alerts before a shelf goes empty.'],
  ['Cash & M-Pesa', 'Record how each sale was paid and reconcile at the end of the day.'],
  ['Receipts', 'Printable receipts for every sale, with a running receipt number.'],
  ['Reports', 'Daily, weekly and monthly sales, top sellers and sales by category.'],
  ['Staff roles', 'Counter staff only see what they need. Owners see everything.'],
  ['Suppliers & purchases', 'Record what you buy and keep supplier details in one place.'],
  ['Training included', 'We train your team so they are confident from day one.'],
]

const TOUR = [
  { ms: 2400, cap: '1 · Find a product: filter by category or search', run: (r) => { r.current.setView('sell'); r.current.setCat('Feeds') } },
  { ms: 2600, cap: '2 · Tap products to add them to the sale', run: (r) => { r.current.addId(1); setTimeout(() => r.current.addId(1), 500); setTimeout(() => r.current.setCat('Drugs'), 1000); setTimeout(() => r.current.addId(3), 1500) } },
  { ms: 3400, cap: '3 · Take payment: cash, or M-Pesa with a prompt to the customer’s phone', run: (r) => { r.current.setMethod('mpesa'); setTimeout(() => r.current.pay(), 1100) } },
  { ms: 2600, cap: '4 · A receipt is ready to print or download. Stock has already updated', run: () => {} },
  { ms: 3000, cap: '5 · Stock: see levels, restock, add new products. Low items are flagged', run: (r) => { r.current.newSale(); r.current.setView('stock') } },
  { ms: 3200, cap: '6 · Reports: today’s sales, top sellers and sales by category', run: (r) => { r.current.setView('report') } },
  { ms: 2400, cap: 'That’s the idea. Now it’s your turn: try it yourself.', run: (r) => { r.current.setView('sell'); r.current.setCat('All') } },
]

function download(name, text, type = 'text/plain') {
  const url = URL.createObjectURL(new Blob([text], { type }))
  const a = document.createElement('a')
  a.href = url
  a.download = name
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 500)
}

export default function Demo() {
  useDocTitle('Live demo · Agrovet POS')
  const [stock, setStock] = useState(START)
  const [cart, setCart] = useState({})
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const [paid, setPaid] = useState(null)
  const [sales, setSales] = useState([])
  const [view, setView] = useState('sell')
  const [method, setMethod] = useState('cash')
  const [phone, setPhone] = useState('0712 345 678')
  const [stk, setStk] = useState(false)
  const [tour, setTour] = useState(-1)
  const [form, setForm] = useState({ name: '', cat: 'Feeds', price: '', stock: '' })
  const seq = useRef(1000)

  const items = useMemo(() => stock.filter((s) => (cat === 'All' || s.cat === cat) && s.name.toLowerCase().includes(q.toLowerCase())), [stock, cat, q])
  const lines = stock.filter((s) => cart[s.id])
  const total = lines.reduce((a, s) => a + s.price * cart[s.id], 0)
  const todayTotal = sales.reduce((a, s) => a + s.total, 0)
  const low = stock.filter((s) => s.stock <= LOW)

  const addId = (id) =>
    setCart((c) => {
      const s = stock.find((x) => x.id === id)
      if (!s || (c[id] || 0) >= s.stock) return c
      return { ...c, [id]: (c[id] || 0) + 1 }
    })
  const add = (s) => addId(s.id)
  const dec = (s) =>
    setCart((c) => {
      const n = { ...c, [s.id]: c[s.id] - 1 }
      if (n[s.id] <= 0) delete n[s.id]
      return n
    })

  const finish = () => {
    const rec = {
      no: ++seq.current,
      time: new Date().toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' }),
      method,
      phone: method === 'mpesa' ? phone : '',
      lines: lines.map((s) => ({ name: s.name, cat: s.cat, qty: cart[s.id], amt: s.price * cart[s.id] })),
      total,
    }
    setPaid(rec)
    setSales((x) => [rec, ...x])
    setStock((st) => st.map((s) => (cart[s.id] ? { ...s, stock: s.stock - cart[s.id] } : s)))
    setCart({})
    setStk(false)
  }
  const pay = () => {
    if (!total) return
    if (method === 'mpesa') {
      setStk(true)
      setTimeout(finish, 1300)
    } else finish()
  }
  const newSale = () => setPaid(null)

  // keep the latest handlers reachable from the guided tour's timers
  const api = useRef({})
  api.current = { setView, setCat, addId, setMethod, pay, newSale }

  useEffect(() => {
    if (tour < 0) return
    if (tour >= TOUR.length) {
      setTour(-1)
      return
    }
    TOUR[tour].run(api)
    const t = setTimeout(() => setTour((n) => (n < 0 ? n : n + 1)), TOUR[tour].ms)
    return () => clearTimeout(t)
  }, [tour])

  const startTour = () => {
    setStock(START)
    setCart({})
    setSales([])
    setPaid(null)
    setMethod('cash')
    setQ('')
    seq.current = 1000
    setTour(0)
    document.getElementById('pos-demo')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  const stopTour = () => setTour(-1)

  const addProduct = (e) => {
    e.preventDefault()
    const price = Number(form.price)
    const st = Number(form.stock)
    if (!form.name.trim() || !(price > 0) || !(st >= 0)) return
    setStock((s) => [...s, { id: Date.now(), name: form.name.trim(), cat: form.cat, price, stock: st }])
    setForm({ name: '', cat: 'Feeds', price: '', stock: '' })
  }
  const restock = (id, n = 10) => setStock((st) => st.map((s) => (s.id === id ? { ...s, stock: s.stock + n } : s)))

  const byCat = useMemo(() => {
    const m = {}
    sales.forEach((s) => s.lines.forEach((l) => (m[l.cat] = (m[l.cat] || 0) + l.amt)))
    return Object.entries(m).sort((a, b) => b[1] - a[1])
  }, [sales])
  const top = useMemo(() => {
    const m = {}
    sales.forEach((s) => s.lines.forEach((l) => (m[l.name] = (m[l.name] || 0) + l.qty)))
    return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 5)
  }, [sales])
  const maxCat = Math.max(1, ...byCat.map((x) => x[1]))

  const receiptText = (r) =>
    ['AGROVET POS (DEMO)', `Receipt #${r.no}  ${r.time}`, '------------------------------', ...r.lines.map((l) => `${l.qty} x ${l.name}  ${kes(l.amt)}`), '------------------------------', `TOTAL ${kes(r.total)}`, `Paid by ${r.method === 'mpesa' ? 'M-Pesa ' + r.phone : 'Cash'}`, 'Demo only. Built by NOX Digital.'].join('\n')

  const printReceipt = (r) => {
    const w = window.open('', '_blank', 'width=380,height=560')
    if (!w) return download(`receipt-${r.no}.txt`, receiptText(r))
    w.document.write(`<pre style="font:14px/1.5 monospace;padding:16px">${receiptText(r).replace(/</g, '&lt;')}</pre>`)
    w.document.close()
    w.focus()
    w.print()
  }
  const exportCsv = () => {
    const rows = [['Receipt', 'Time', 'Method', 'Item', 'Category', 'Qty', 'Amount']]
    sales.forEach((s) => s.lines.forEach((l) => rows.push([s.no, s.time, s.method, l.name, l.cat, l.qty, l.amt])))
    download('agrovet-demo-sales.csv', rows.map((r) => r.map((c) => `"${c}"`).join(',')).join('\n'), 'text/csv')
  }

  const touring = tour >= 0 && tour < TOUR.length

  return (
    <>
      <PageHero kicker="Live demo" bgText="DEMO" title="See the POS in action." lede="Watch a 30-second tour, try the real thing with made-up products, or download the demo and run it on your own computer. No sign-up.">
        <div className="phero-actions">
          <button className="btn btn-light btn-lg" onClick={startTour}>
            <Icon name="arrow" size={18} /> Watch the tour
          </button>
          <a className="btn btn-outline-light btn-lg" href="/downloads/nox-agrovet-pos-demo.html" download>
            Download the demo
          </a>
        </div>
      </PageHero>

      <section className="section" id="pos-demo">
        <div className="wrap">
          {touring && (
            <div className="tour-bar" role="status" aria-live="polite">
              <span className="tour-dot" aria-hidden="true" />
              <b>{TOUR[tour].cap}</b>
              <div className="tour-prog" aria-hidden="true">
                {TOUR.map((_, i) => (
                  <i key={i} className={i <= tour ? 'on' : ''} />
                ))}
              </div>
              <button onClick={stopTour}>Skip tour</button>
            </div>
          )}
          <div className={`pos ${touring ? 'is-touring' : ''}`}>
            <aside className="pos-side">
              <b className="mono">AGROVET POS</b>
              {[['sell', 'Sales'], ['stock', 'Stock'], ['report', 'Reports']].map(([k, l]) => (
                <button key={k} className={view === k ? 'on' : ''} onClick={() => setView(k)}>
                  {l}
                </button>
              ))}
              <button className="pos-tour-btn" onClick={startTour}>▶ Guided tour</button>
              <small>Demo data only</small>
            </aside>
            <div className="pos-main">
              <div className="pos-kpis">
                <div><small>Today’s sales</small><b>{kes(todayTotal)}</b></div>
                <div><small>Receipts</small><b>{sales.length}</b></div>
                <div><small>Items in stock</small><b>{stock.reduce((a, s) => a + s.stock, 0)}</b></div>
                <div className={low.length ? 'warn' : ''}><small>Low stock</small><b>{low.length}</b></div>
              </div>

              {view === 'sell' && (
                <div className="pos-sell">
                  <div>
                    <div className="pos-tools">
                      <input aria-label="Search products" placeholder="Search products…" value={q} onChange={(e) => setQ(e.target.value)} />
                      <div className="pos-cats">
                        {CATS.map((c) => (
                          <button key={c} className={cat === c ? 'on' : ''} onClick={() => setCat(c)}>{c}</button>
                        ))}
                      </div>
                    </div>
                    <div className="pos-items">
                      {items.map((s) => (
                        <button key={s.id} disabled={s.stock === 0 || (cart[s.id] || 0) >= s.stock} onClick={() => add(s)}>
                          <span>{s.name}</span>
                          <b>{kes(s.price)}</b>
                          <small className={s.stock <= LOW ? 'lowtxt' : ''}>{s.stock === 0 ? 'Out of stock' : `${s.stock} in stock`}</small>
                        </button>
                      ))}
                      {!items.length && <p className="pos-empty">No products match.</p>}
                    </div>
                  </div>
                  <div className="pos-cart">
                    {paid ? (
                      <div className="receipt">
                        <b className="mono">Receipt #{paid.no}</b>
                        <small className="dim">{paid.time} · {paid.method === 'mpesa' ? `M-Pesa ${paid.phone}` : 'Cash'}</small>
                        {paid.lines.map((l) => (
                          <div key={l.name}><span>{l.qty}× {l.name}</span><span>{kes(l.amt)}</span></div>
                        ))}
                        <div className="rt"><span>Total</span><b>{kes(paid.total)}</b></div>
                        <div className="rbtns">
                          <button className="btn btn-ghost" onClick={() => printReceipt(paid)}>Print</button>
                          <button className="btn btn-ghost" onClick={() => download(`receipt-${paid.no}.txt`, receiptText(paid))}>Download</button>
                        </div>
                        <button className="btn btn-dark" onClick={newSale}>New sale</button>
                      </div>
                    ) : (
                      <>
                        <b className="mono">Current sale</b>
                        {lines.length === 0 && <p className="pos-empty">Tap a product to add it.</p>}
                        {lines.map((s) => (
                          <div key={s.id} className="cl">
                            <span>{s.name}</span>
                            <span className="qty">
                              <button aria-label={`Remove one ${s.name}`} onClick={() => dec(s)}>−</button>
                              {cart[s.id]}
                              <button aria-label={`Add one ${s.name}`} onClick={() => add(s)}>+</button>
                            </span>
                            <b>{kes(s.price * cart[s.id])}</b>
                          </div>
                        ))}
                        <div className="pay-method" role="group" aria-label="Payment method">
                          <button className={method === 'cash' ? 'on' : ''} onClick={() => setMethod('cash')}>Cash</button>
                          <button className={method === 'mpesa' ? 'on' : ''} onClick={() => setMethod('mpesa')}>M-Pesa</button>
                        </div>
                        {method === 'mpesa' && (
                          <label className="pay-phone">
                            <small>Customer phone</small>
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" />
                          </label>
                        )}
                        <div className="ct"><span>Total</span><b>{kes(total)}</b></div>
                        <button className="btn btn-dark btn-lg" disabled={!total || stk} onClick={pay}>
                          {stk ? 'Waiting for M-Pesa…' : method === 'mpesa' ? 'Send M-Pesa prompt' : 'Take cash & print receipt'}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}

              {view === 'stock' && (
                <div className="pos-stock">
                  <div className="pos-table-wrap">
                    <table className="pos-table">
                      <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th /></tr></thead>
                      <tbody>
                        {stock.map((s) => (
                          <tr key={s.id} className={s.stock <= LOW ? 'lowrow' : ''}>
                            <td>{s.name}</td>
                            <td>{s.cat}</td>
                            <td>{kes(s.price)}</td>
                            <td>{s.stock}{s.stock <= LOW && <em> · low</em>}</td>
                            <td><button className="mini" onClick={() => restock(s.id)}>+10</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <form className="pos-add" onSubmit={addProduct}>
                    <b className="mono">Add a product</b>
                    <input aria-label="Product name" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <select aria-label="Category" value={form.cat} onChange={(e) => setForm({ ...form, cat: e.target.value })}>
                      {CATS.slice(1).map((c) => <option key={c}>{c}</option>)}
                    </select>
                    <div className="two">
                      <input aria-label="Price" type="number" min="1" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                      <input aria-label="Stock" type="number" min="0" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
                    </div>
                    <button className="btn btn-dark" type="submit">Add product</button>
                  </form>
                </div>
              )}

              {view === 'report' && (
                <div className="pos-report">
                  {sales.length === 0 ? (
                    <p className="dim">No sales yet. Make a sale on the Sales tab, then come back to see your reports update.</p>
                  ) : (
                    <div className="rep-grid">
                      <div>
                        <h4 className="mono">Sales by category</h4>
                        {byCat.map(([c, v]) => (
                          <div key={c} className="bar">
                            <span>{c}</span>
                            <i><u style={{ width: `${(v / maxCat) * 100}%` }} /></i>
                            <b>{kes(v)}</b>
                          </div>
                        ))}
                        <h4 className="mono">Top sellers</h4>
                        <ol className="topn">{top.map(([n, v]) => <li key={n}><span>{n}</span><b>{v} sold</b></li>)}</ol>
                      </div>
                      <div>
                        <h4 className="mono">Recent receipts</h4>
                        <ul className="recent">
                          {sales.slice(0, 6).map((s) => (
                            <li key={s.no}><span>#{s.no} · {s.time} · {s.method === 'mpesa' ? 'M-Pesa' : 'Cash'}</span><b>{kes(s.total)}</b></li>
                          ))}
                        </ul>
                        <button className="btn btn-ghost" onClick={exportCsv}>Export sales (CSV)</button>
                      </div>
                    </div>
                  )}
                  <p className="dim rep-note">Products needing restock: {low.length ? low.map((s) => s.name).join(', ') : 'none'}. In the real system you also get monthly reports, staff accounts and supplier records.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section dark demo-dl">
        <div className="wrap demo-dl-grid">
          <div>
            <Head label="Take it with you" num="02">
              Download the
              <br />
              <span className="dim">demo.</span>
            </Head>
            <p className="lede">
              One small file that runs in any browser on Windows, Mac or Android. No installation, no internet needed once it’s saved. Your demo sales are kept on your device so you can show the team.
            </p>
            <div className="dl-btns">
              <a className="btn btn-light btn-lg" href="/downloads/nox-agrovet-pos-demo.html" download>
                <Icon name="arrow" size={18} /> Download demo (HTML)
              </a>
              <a className="btn btn-outline-light btn-lg" href={waLink(brand.whatsapp, 'Hi NOX Digital! I tried the POS demo and I’d like one for my shop.')} target="_blank" rel="noreferrer">
                <Icon name="whatsapp" size={18} /> I want one for my shop
              </a>
            </div>
            <small className="dl-note mono">≈ 14 KB · Open the file in Chrome, Edge or Safari · Demo data only</small>
          </div>
          <ol className="dl-steps">
            {['Click Download demo', 'Open the saved file (double-click it)', 'Sell, restock and view reports', 'Tell us what you’d change'].map((t, i) => (
              <li key={t}><span className="mono">{String(i + 1).padStart(2, '0')}</span>{t}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section demo-feats">
        <div className="wrap">
          <Head label="The real system" num="03" lede="The demo shows the core. A real NOX POS is set up around your products, your staff and your shop.">
            What you get.
          </Head>
          <div className="feat-grid">
            {FEATURES.map(([t, d], i) => (
              <Reveal key={t} delay={(i % 4) * 0.06} className="feat">
                <Icon name="check" size={22} stroke={2} />
                <h3>{t}</h3>
                <p>{d}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="demo-actions">
            <Link to="/work/agrovet-pos" className="btn btn-ghost btn-lg">Read the case study</Link>
            <Link to="/pricing?tab=pos" className="btn btn-dark btn-lg">POS pricing <Icon name="arrow" size={18} /></Link>
            <Link to="/estimator?type=pos" className="btn btn-ghost btn-lg">Price one for my shop</Link>
          </Reveal>
        </div>
      </section>

      <CTA title="Want one for" script="your shop?" />
    </>
  )
}
