const form1 = document.querySelector("#updateAccountForm")
    form1.addEventListener("change", function () {
      const updateBtn = document.querySelector("button")
      updateBtn.removeAttribute("disabled")
    })

const form2 = document.querySelector("#updatePasswordForm")
    form2.addEventListener("change", function () {
      const updateBtn = document.querySelector("button")
      updateBtn.removeAttribute("disabled")
    })