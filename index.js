const $ = selector => document.querySelector(selector)
const $$ = selector => document.querySelectorAll(selector)

class Gemini {
  newChat() {
    const newChatBtn = $('[aria-label="New chat"] > button')
    newChatBtn?.click()
  }

  toggleSidebar() {
    const sideBarBtn = $('button[aria-label="Main menu"]')
    sideBarBtn.click()
  }

  focusOnChatInput() {
    const chatInput = $('[role="textbox"]')
    chatInput.focus()
  }

  copyLastResponse() {
    const moreBtns = $$('button[aria-label="Show more options"]')
    const latestMoreBtn = moreBtns[moreBtns.length - 1]
    latestMoreBtn?.click()

    const copyBtn = $('button[aria-label="Copy"]')
    if (latestMoreBtn) copyBtn?.click()

    latestMoreBtn.blur()
  }

  copyLastCode() {
    const copyBtns = $$('button[aria-label="Copy code"]')
    const latestCopyBtn = copyBtns[copyBtns.length - 1]
    latestCopyBtn?.click() // NOTE must scroll until the end of the answer to work
  }
}

class BingCopilot {
  newChat() {
    const newChatBtn = $('.cib-serp-main')
      .shadowRoot.querySelector('#cib-action-bar-main')
      .shadowRoot.querySelector('button')
    newChatBtn?.click()
  }

  toggleSidebar() {
    const sideBarBtn = $('a[aria-label="Settings and quick links"]')
    sideBarBtn.click()
  }

  focusOnChatInput() {
    const chatInput = $('.cib-serp-main')
      .shadowRoot.querySelector('#cib-action-bar-main')
      .shadowRoot.querySelector('cib-text-input')
      .shadowRoot.querySelector('textarea')
    chatInput.focus()
  }

  copyLastResponse() {
    const chats = $('.cib-serp-main')
      .shadowRoot.querySelector('#cib-conversation-main')
      .shadowRoot.querySelectorAll('cib-chat-turn')

    const lastChats = chats[chats.length - 1]

    const messageGroups = lastChats
    const lastMessageGroup = messageGroups[messageGroups.length - 1]

    // const copyBtn = lastMessageGroup?.shadowRoot
    //   .querySelector('cib-message')
    //   .shadowRoot.querySelector('cib-message-actions')
    //   .shadowRoot.querySelector('button#copy-button')

    // console.log(copyBtn)
    // copyBtn?.click()
  }

  copyLastCode() {}
}

const AI = window.location.href.includes('google.com')
  ? new Gemini()
  : new BingCopilot()

document.addEventListener('keydown', function (e) {
  if (e.ctrlKey && e.key === 'k') {
    e.preventDefault()
    AI.newChat()
  }

  if (e.ctrlKey && e.shiftKey && e.key === 'S') {
    e.preventDefault()
    AI.toggleSidebar()
  }

  if (e.shiftKey && e.key === 'Escape') {
    e.preventDefault()
    AI.focusOnChatInput()
  }

  if (e.ctrlKey && e.shiftKey && e.key === 'C') {
    e.preventDefault()
    AI.copyLastResponse()
  }

  if (e.ctrlKey && e.shiftKey && e.key === ':') {
    e.preventDefault()
    AI.copyLastCode()
  }
})
