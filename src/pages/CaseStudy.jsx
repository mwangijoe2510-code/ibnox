import { Link, useParams } from 'react-router-dom'
import { CTA, PageHero, useDocTitle } from '../components/shared.jsx'
import { Gallery, useHasGallery } from '../components/SiteMock.jsx'
import { DevicePanel } from '../components/Devices.jsx'
import { Icon, Reveal, SectionLabel } from '../components/ui.jsx'
import { projects } from '../data.js'
import { caseExtras, caseServiceGroup } from '../cases.js'
import NotFound from './NotFound.jsx'

export default function CaseStudy() {
  const { slug } = useParams()
  const i = projects.findIndex((p) => p.slug === slug)
  const p = projects[i]
  useDocTitle(p ? p.name : 'Not found')
  const hasGallery = useHasGallery(p || { slug: '' })
  if (!p) return <NotFound />
  const next = projects[(i + 1) % projects.length]
  const x = caseExtras[p.slug] || {}
  const group = caseServiceGroup[p.slug] || 'websites'
  const showFlow = p.slug === 'agrovet-pos' && x.flow
  let c = 2
  const num = {
    cs: x.challenges ? String(++c).padStart(2, '0') : '',
    flow: showFlow ? String(++c).padStart(2, '0') : '',
    built: String(++c).padStart(2, '0'),
    dec: x.decisions ? String(++c).padStart(2, '0') : '',
    out: String(++c).padStart(2, '0'),
  }

  return (
    <>
      <PageHero kicker={`Case study · ${p.category}`} bgText={String(i + 1).padStart(2, '0')} title={p.name} lede={p.blurb}>
        <dl className="meta">
          <div>
            <dt className="mono">Client</dt>
            <dd>{p.sector}</dd>
          </div>
          {p.year && (
            <div>
              <dt className="mono">Year</dt>
              <dd>{p.year}</dd>
            </div>
          )}
          <div>
            <dt className="mono">What we did</dt>
            <dd>{p.scope.join(', ')}</dd>
          </div>
          {p.slug === 'agrovet-pos' && (
            <div>
              <dt className="mono">Live demo</dt>
              <dd>
                <Link to="/demo" className="meta-link">
                  Try the POS <Icon name="arrowUR" size={16} />
                </Link>
              </dd>
            </div>
          )}
          {p.url && (
            <div>
              <dt className="mono">Live site</dt>
              <dd>
                <a href={p.url} target="_blank" rel="noreferrer" className="meta-link">
                  {p.host} <Icon name="arrowUR" size={16} />
                </a>
              </dd>
            </div>
          )}
        </dl>
      </PageHero>

      <section className="cs-visual">
        <div className="wrap">
          <Reveal y={60}>
            <DevicePanel project={p} />
          </Reveal>
        </div>
      </section>

      {hasGallery && (
        <section className="cs-gallery">
          <div className="wrap gallery-grid">
            <Gallery project={p} />
          </div>
        </section>
      )}

      {(x.goals || x.role || x.stack || x.duration || x.metrics) && (
        <section className="cx-glance">
          <div className="wrap cx-glance-grid">
            <Reveal className="cx-facts">
              <h2 className="mono">At a glance</h2>
              <dl>
                {x.role && (<div><dt>Our role</dt><dd>{x.role}</dd></div>)}
                {x.audience && (<div><dt>Built for</dt><dd>{x.audience}</dd></div>)}
                {x.duration && (<div><dt>Timeline</dt><dd>{x.duration}</dd></div>)}
                {x.team && (<div><dt>Team</dt><dd>{x.team}</dd></div>)}
              </dl>
              {x.stack && (
                <div className="chips">
                  {x.stack.map((t) => (<span key={t} className="chip">{t}</span>))}
                </div>
              )}
            </Reveal>
            {x.goals && (
              <Reveal delay={0.08} className="cx-goals">
                <h2 className="mono">Goals</h2>
                <ol>
                  {x.goals.map((g, k) => (
                    <li key={g}><span className="mono">{String(k + 1).padStart(2, '0')}</span>{g}</li>
                  ))}
                </ol>
              </Reveal>
            )}
          </div>
          {x.metrics?.length > 0 && (
            <div className="wrap cx-metrics">
              {x.metrics.map((m) => (
                <Reveal key={m.l} className="cx-metric"><b>{m.n}</b><span>{m.l}</span></Reveal>
              ))}
            </div>
          )}
        </section>
      )}

      <section className="section cs-brief">
        <div className="wrap cs-grid">
          <Reveal>
            <SectionLabel num="01">The brief</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="cs-lead">{p.challenge}</p>
          </Reveal>
        </div>
      </section>

      <section className="section cs-approach">
        <div className="wrap">
          <Reveal>
            <SectionLabel num="02">Our approach</SectionLabel>
          </Reveal>
          <div className="approach">
            {p.approach.map(([t, d], k) => (
              <Reveal key={t} delay={k * 0.08} className="approach-item">
                <span className="approach-n">{String(k + 1).padStart(2, '0')}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {x.challenges && (
        <section className="section cx-cs">
          <div className="wrap">
            <Reveal>
              <SectionLabel num={num.cs}>Challenges &amp; solutions</SectionLabel>
            </Reveal>
            <div className="cx-pairs">
              {x.challenges.map(([c, sol], k) => (
                <Reveal key={c} delay={k * 0.07} className="cx-pair">
                  <div className="cx-pair-c"><span className="mono">Challenge</span><p>{c}</p></div>
                  <Icon name="arrow" size={26} className="cx-pair-arrow" />
                  <div className="cx-pair-s"><span className="mono">What we did</span><p>{sol}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {showFlow && (
        <section className="section cx-flow">
          <div className="wrap">
            <Reveal>
              <SectionLabel num={num.flow}>How a sale works</SectionLabel>
            </Reveal>
            <ol className="cx-steps">
              {x.flow.map(([t, d], k) => (
                <Reveal as="li" key={t} delay={k * 0.08}>
                  <span className="mono">{String(k + 1).padStart(2, '0')}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </Reveal>
              ))}
            </ol>
            <Reveal className="cx-demo-cta">
              <div>
                <b>See it for yourself</b>
                <p>Run a working demo in your browser or download it to try on your own computer.</p>
              </div>
              <div className="cx-demo-btns">
                <Link to="/demo" className="btn btn-dark">Try the live demo <Icon name="arrowUR" size={16} /></Link>
                <a className="btn btn-ghost" href="/downloads/nox-agrovet-pos-demo.html" download>Download demo</a>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="section dark cs-built">
        <div className="wrap">
          <Reveal>
            <SectionLabel num={num.built}>What we built</SectionLabel>
          </Reveal>
          <ul className="built">
            {p.built.map((b, k) => (
              <Reveal as="li" key={b} delay={(k % 2) * 0.06}>
                <span className="mono">{String(k + 1).padStart(2, '0')}</span>
                {b}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {x.decisions && (
        <section className="section cx-dec">
          <div className="wrap">
            <Reveal>
              <SectionLabel num={num.dec}>Key decisions</SectionLabel>
            </Reveal>
            <div className="cx-dec-grid">
              {x.decisions.map(([t, d], k) => (
                <Reveal key={t} delay={k * 0.07} className="cx-dec-item">
                  <h3>{t}</h3>
                  <p>{d}</p>
                </Reveal>
              ))}
            </div>
            {x.before && x.after && (
              <Reveal className="cx-ba">
                <div className="cx-ba-b">
                  <span className="mono">Before</span>
                  <ul>{x.before.map((b) => (<li key={b}>{b}</li>))}</ul>
                </div>
                <div className="cx-ba-a">
                  <span className="mono">After</span>
                  <ul>{x.after.map((b) => (<li key={b}><Icon name="check" size={16} stroke={2.2} /> {b}</li>))}</ul>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      <section className="section cs-out">
        <div className="wrap">
          <Reveal>
            <SectionLabel num={num.out}>The result</SectionLabel>
          </Reveal>
          <div className="outcomes">
            {p.outcomes.map((o, k) => (
              <Reveal key={o} delay={k * 0.08} className="outcome">
                <Icon name="check" size={26} stroke={2} />
                <p>{o}</p>
              </Reveal>
            ))}
          </div>
          <div className="chips cs-tags">
            {p.scope.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
          {x.quote && (
            <Reveal as="blockquote" className="cx-quote">
              “{x.quote.text}”
              <footer>{x.quote.name}{x.quote.role ? `, ${x.quote.role}` : ''}</footer>
            </Reveal>
          )}
          {x.lesson && (
            <Reveal className="cx-lesson">
              <span className="mono">What we learned</span>
              <p>{x.lesson}</p>
            </Reveal>
          )}
          <Reveal className="cx-price-cta">
            <div>
              <span className="mono">Want something like this?</span>
              <b>See what a project like this costs.</b>
            </div>
            <div className="cx-demo-btns">
              <Link to={`/pricing?tab=${group}`} className="btn btn-dark">View pricing <Icon name="arrow" size={16} /></Link>
              <Link to="/contact" className="btn btn-ghost">Talk to us</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Link to={`/work/${next.slug}`} className="nextcase dark" data-hot>
        <div className="wrap nextcase-in">
          <span className="mono">Next case study</span>
          <b>{next.name}</b>
          <span className="pcard-go">
            <Icon name="arrow" size={24} />
          </span>
        </div>
      </Link>

      <CTA />
    </>
  )
}
