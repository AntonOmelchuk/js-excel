const createButton = ({icon, active, value}) => {
  const json = JSON.stringify(value)
  const meta = `
    data-type="button"
    data-value='${json}'
  `
  return `
    <div class="button ${active && 'active'}" ${meta}>
      <span class="material-icons" ${meta}>${icon}</span>
    </div>
  `
}

export const toolbarTamplate = (state) => {
  const buttons = [
    {
      icon: 'format_align_left',
      active: state['textAlign'] === 'left',
      value: {textAlign: 'left'}
    },
    {
      icon: 'format_align_center',
      active: state['textAlign'] == 'center',
      value: {textAlign: 'center'}
    },
    {
      icon: 'format_align_right',
      active: state['textAlign'] === 'right',
      value: {textAlign: 'right'}
    },
    {
      icon: 'format_bold',
      active: state['fontWeight'] === 'bold' && true,
      value: {fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold'}
    },
    {
      icon: 'format_italic',
      active: state['fontStyle'] === 'italic' && true,
      value: {fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic'}
    },
    {
      icon: 'format_underline',
      active: state['fontDecotarion'] === 'underline' && true,
      value: {fontDecotarion: state['fontDecotarion'] === 'underline' ? 'none' : 'underline'}
    },
  ]
  return buttons.map(createButton).join('')
}
