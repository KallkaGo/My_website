import { WindSketch } from './NotebookArt'

const Hero = () => (
  <section id='notebook' className='notebook-hero notebook-container' aria-labelledby='hero-title'>
    <div className='hero-intro'>
      <p className='section-kicker'>A notebook of digital experiments</p>
      <h1 id='hero-title'>Curiosity,<br />made visible<span>.</span></h1>
      <p className='hero-description'>I explore light, materials and motion through code.</p>
      <div className='hero-actions'>
        <a className='notebook-button' href='#work'>Explore the work <span aria-hidden='true'>↗</span></a>
        <a className='hero-lab-link' href='#lab'>Or, play a little <span aria-hidden='true'>↗</span></a>
      </div>
      <p className='hero-signoff'>WebGL <span>·</span> Three.js <span>·</span> Real-time shaders</p>
      <span className='hand-note hero-margin-note' aria-hidden='true'>light, water,<br />& refraction</span>
    </div>
    <div className='hero-project bokeh-hero-project'>
      <figure className='project-print light-study-print' aria-label='Bokeh: animated defocused light'>
        <div className='bokeh-art-camera'>
          <div className='print-mount print-mount-taped'>
            <div className='print-image-window bokeh-study-image'>
              <canvas id='bokeh-study-canvas' className='bokeh-study-canvas' aria-hidden='true' />
            </div>
          </div>
        </div>
        <figcaption className='print-caption'>
          <div><h3><span className='print-number'>00 /</span> Bokeh</h3><p>Light in motion</p></div>
          <span className='hand-note light-study-note'>soft focus,<br />drifting light</span>
        </figcaption>
      </figure>
      <div className='hero-wind-note' aria-hidden='true'><WindSketch /><span className='hand-note'>still moving</span></div>
    </div>
  </section>
)
export default Hero
