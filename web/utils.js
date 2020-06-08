export function scrollItemIntoView (elementClass) {
  try {
    const element = document.getElementsByClassName(elementClass)[0]
    if (element) {
      element.scrollIntoView(false)
    }
  } catch (e) {
    console.log(e)
    } // eslint-disable-line
}
