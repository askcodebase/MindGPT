import React, { useState, useRef, useEffect } from 'react'
import { Transformer } from 'markmap-lib'
import { Markmap } from 'markmap-view'
import { Toolbar } from 'markmap-toolbar'
import 'markmap-toolbar/dist/style.css'

const transformer = new Transformer()
const initValue = `# markmap

- beautiful
- useful
- easy
- interactive
`

function renderToolbar(mm: Markmap, wrapper: HTMLElement) {
  while (wrapper?.firstChild) wrapper.firstChild.remove()
  if (mm && wrapper) {
    const toolbar = new Toolbar()
    toolbar.attach(mm)
    // Register custom buttons
    toolbar.register({
      id: 'alert',
      title: 'Click to show an alert',
      content: 'Alert',
      onClick: () => alert('You made it!')
    })
    toolbar.setItems([...Toolbar.defaultItems, 'alert'])
    wrapper.append(toolbar.render())
  }
}

export default function MarkmapHooks() {
  const [value, setValue] = useState(initValue)
  const refSvg = useRef<SVGSVGElement | null>(null)
  const refMm = useRef<Markmap>()
  const refToolbar = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mm = Markmap.create(refSvg.current!)
    refMm.current = mm
    renderToolbar(refMm.current, refToolbar.current!)
  }, [refSvg.current])

  useEffect(() => {
    const mm = refMm.current
    if (!mm) return
    const { root } = transformer.transform(value)
    mm.setData(root)
    mm.fit()
  }, [refMm.current, value])

  const handleChange = (e: { target: { value: string } }) => {
    setValue(e.target.value)
  }

  return (
    <>
      <div className='flex-1'>
        <textarea
          className='w-full h-full border border-gray-400'
          value={value}
          onChange={handleChange}
        />
      </div>
      <svg className='flex-1' ref={refSvg} />
      <div className='absolute bottom-1 right-1' ref={refToolbar}></div>
    </>
  )
}
