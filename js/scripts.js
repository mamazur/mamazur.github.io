/* Image modal */
function toggleModal(img) {
  let modal = document.getElementById('imgModal')
  if (modal.classList.contains('closed')) {
    modal.classList.remove('closed')
    modal.scrollTo(0, 0)
    modal.children.item(1).src = img.src
    modal.children.item(1).alt = img.alt
  } else {
    modal.classList.add('closed')
  }
}

/* Close Image modal by using ESC aswell */
document.addEventListener('keydown', closeModalWithESC);

function closeModalWithESC(e) {
  let modal = document.getElementById('imgModal')
  if (e.keyCode == 27 && !modal.classList.contains('closed')) {
    modal.classList.add('closed')
  }
}
