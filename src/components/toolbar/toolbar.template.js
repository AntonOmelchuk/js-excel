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

export const toolbarTamplate = () => {
  const buttons = [
    {
      icon: 'format_align_left',
      active: false,
      value: {textAlign: 'left'}
    },
    {
      icon: 'format_align_center',
      active: false,
      value: {textAlign: 'center'}
    },
    {
      icon: 'format_align_right',
      active: false,
      value: {textAlign: 'right'}
    },
    {
      icon: 'format_bold',
      active: false,
      value: {fontWeight: 'bold'}
    },
    {
      icon: 'format_italic',
      active: false,
      value: {fontStyle: 'italic'}
    },
    {
      icon: 'format_underline',
      active: false,
      value: {fontDecotarion: 'underline'}
    },
  ]
  return buttons.map(createButton).join('')
}
