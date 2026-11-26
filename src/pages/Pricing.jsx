import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CTA, FAQ, Head, PageHero, useDocTitle } from '../components/shared.jsx'
import { Icon, Reveal } from '../components/ui.jsx'
import { addons, brand, bundles, included, payTerms, pricingFaqs, pricingGroups } from '../data.js'
import { kes, waLink } from '../lib/money.js'

function PlanCard({ plan, group, i }) {
  const month = group.billing === 'month'
  const ask = waLink(brand.whatsapp, `Hi NOX Digital! I'm interested in the ${plan.name} (${group.label}) package from ${kes(plan.from)}${month ? '/month' : ''}.`)
  return (
    <Reveal delay={i * 0.07} className={`plan ${plan.popular ? 'is-pop' : ''}`}>
      {plan.popular && <span className="plan-flag mono">Most chosen</span>}
      <header>
        <span className="plan-group mono">{group.label}</span>
        <h3>{plan.name}</h3>
      </header>
      <div className="plan-price">
        <small className="mono">From</small>
        <div>
          <b>{kes(plan.from)}</b>
          {month && <span>/ month</span>}
        </div>
      </div>
      <p className="plan-for">{plan.for}</p>
      <ul>
        {plan.features.map((f) => (
          <li key={f}>
            <Icon name="check" size={16} stroke={2.2} /> {f}
          </li>
        ))}
      </ul>
      <div className="plan-time mono">{month ? 'Commitment' : 'Typical timeline'} · {plan.time}</div>
      <div className="plan-actions">
        <a className={`btn ${plan.popular ? 'btn-light' : 'btn-dark'}`} href={ask} target="_blank" rel="noreferrer">
          <Icon name="whatsapp" size={16} /> Choose {plan.name}
        </a>
        {!month && (
          <Link to={`/estimator?type=${group.est}`} className="plan-est">
            Customise &amp; estimate →
          </Link>
        )}
      </div>
    </Reveal>
  )
}

export default function Pricing() {
  useDocTitle('Pricing')
  const [params, setParams] = useSearchParams()
  const initial = pricingGroups.find((g) => g.id === params.get('tab'))?.id || 'websites'
  const [tab, setTab] = useState(initial)
  const group = pricingGroups.find((g) => g.id === tab)

  const pick = (id) => {
    setTab(id)
    setParams({ tab: id }, { replace: true, preventScrollReset: true })
  }

  return (
    <>
      <PageHero kicker="Pricing" bgText="PRICING" title="Clear prices. No surprises." lede="Straightforward starting prices for everything we build, in Kenyan shillings. You always get a fixed, written quote before we start.">
        <div className="phero-actions">
          <Link to="/estimator" className="btn btn-light btn-lg">
            Get an instant estimate <Icon name="arrow" size={18} />
          </Link>
          <a className="btn btn-outline-light btn-lg" href={waLink(brand.whatsapp, 'Hi NOX Digital! I have a question about pricing.')} target="_blank" rel="noreferrer">
            <Icon name="whatsapp" size={18} /> Ask about pricing
          </a>
        </div>
      </PageHero>

      <section className="section pricing">
        <div className="wrap">
          <div className="ptabs" role="tablist" aria-label="Pricing categories">
            {pricingGroups.map((g) => (
              <button key={g.id} role="tab" aria-selected={tab === g.id} className={tab === g.id ? 'on' : ''} onClick={() => pick(g.id)}>
                <Icon name={g.icon} size={18} /> {g.label}
              </button>
            ))}
          </div>

          <div className="ptab-intro" key={`i-${tab}`}>
            <p>{group.blurb}</p>
            <span className="mono">{group.billing === 'month' ? 'Monthly plans · cancel after the minimum term' : 'One-off project prices'}</span>
          </div>

          <div className="plan-grid" key={tab}>
            {group.plans.map((p, i) => (
              <PlanCard key={p.slug} plan={p} group={group} i={i} />
            ))}
          </div>

          <p className="price-note">
            Prices are starting points in Kenyan shillings (KES). Domain, hosting and third-party fees are quoted separately at cost. Not sure what fits?{' '}
            <Link className="u" to="/contact">Talk to us</Link> and we’ll recommend the right option.
          </p>
        </div>
      </section>

      <section className="section dark pr-included">
        <div className="wrap">
          <Head label="Every project" num="02">
            Included in
            <br />
            <span className="dim">everything we do.</span>
          </Head>
          <ul className="inc-grid">
            {included.map((x, i) => (
              <Reveal as="li" key={x} delay={(i % 3) * 0.06}>
                <Icon name="check" size={22} stroke={2} />
                {x}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section pr-bundles">
        <div className="wrap">
          <Head label="Bundles" num="03" lede="Need more than one thing? Bundle them and save.">
            Better together.
          </Head>
          <div className="bundle-grid">
            {bundles.map((b, i) => (
              <Reveal key={b.slug} delay={i * 0.08} className="bundle">
                <span className="bundle-save mono">Save {kes(b.worth - b.price)}</span>
                <h3>{b.name}</h3>
                <p>{b.for}</p>
                <ul>
                  {b.items.map((it) => (
                    <li key={it}>
                      <Icon name="check" size={16} stroke={2.2} /> {it}
                    </li>
                  ))}
                </ul>
                <div className="bundle-price">
                  <s>{kes(b.worth)}</s>
                  <b>{kes(b.price)}</b>
                </div>
                <a
                  className="btn btn-dark"
                  href={waLink(brand.whatsapp, `Hi NOX Digital! I'd like the "${b.name}" bundle (${kes(b.price)}).`)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Get this bundle <Icon name="arrow" size={16} />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section pr-how">
        <div className="wrap pr-how-grid">
          <div>
            <Head label="How you pay" num="04" lede="Spread the cost across the project. No big surprise at the end.">
              Pay as
              <br />
              <span className="dim">we deliver.</span>
            </Head>
            <ol className="pay-steps">
              {payTerms.map((s, i) => (
                <Reveal as="li" key={s.t} delay={i * 0.08}>
                  <b className="pay-pct">{s.pct}</b>
                  <div>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal className="addons" delay={0.1}>
            <h3 className="mono">Popular add-ons</h3>
            <table>
              <tbody>
                {addons.map((a) => (
                  <tr key={a.n}>
                    <td>{a.n}</td>
                    <td>
                      <b>{kes(a.p)}</b>
                      <small> {a.u}</small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <FAQ num="05" items={pricingFaqs} />
      <CTA title="Ready for a" script="fixed quote?" />
    </>
  )
}
