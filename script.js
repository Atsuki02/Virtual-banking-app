function displayNone(ele) {
  ele.classList.remove("d-block");
  ele.classList.add("d-none");
}

function displayBlock(ele) {
  ele.classList.remove("d-none");
  ele.classList.add("d-block");
}

const config = {
  page0: document.getElementById("page0"),
  page1: document.getElementById("page1"),
  page2: document.getElementById("page2"),
  page3: document.getElementById("page3"),
  page4: document.getElementById("page4"),
  page5: document.getElementById("page5"),
  page6: document.getElementById("page6"),
  initialForm: document.getElementById("initial-form"),
  bankPage: document.getElementById("bankPage"),
  sidePage: document.getElementById("sidePage"),
};

class BankAccount {
  maxWithdrawPercent = 0.2;
  annualInterestRate = 0.08;

  constructor(firstName, lastName, email, type, accountNumber, money) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.type = type;
    this.accountNumber = accountNumber;
    this.money = money;
    this.initialDeposit = money;
  }

  getFullName() {
    return this.firstName + " " + this.lastName;
  }

  calculateWithdrawAmount(amount) {
    let maxWithdrawAmount = Math.floor(this.money * this.maxWithdrawPercent);
    amount = amount > maxWithdrawAmount ? maxWithdrawAmount : amount;
    return amount;
  }

  withdraw(amount) {
    this.money -= this.calculateWithdrawAmount(amount);
    return this.money;
  }

  deposit(amount) {
    this.money += amount;
    return amount;
  }

  simulateTimePassage(days) {
    let daysPerYear = 365;
    let profit =
      this.money * Math.pow(1 + this.annualInterestRate, days / daysPerYear) -
      this.money;
    this.money += profit;
    return profit;
  }
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function initializeUserAccount() {
  const form = document.querySelector(".create-account-form");
  let userBankAccount = new BankAccount(
    form.querySelectorAll(`input[name="userFirstName"]`).item(0).value,
    form.querySelectorAll(`input[name="userLastName"]`).item(0).value,
    form.querySelectorAll(`input[name="userEmail"]`)[0].value,
    form
      .querySelectorAll(`input[name="userAccountType"]:checked`)
      .item(0).value,
    getRandomInteger(1, Math.pow(10, 8)),
    parseInt(
      form.querySelectorAll(`input[name="userFirstDeposit"]`).item(0).value
    )
  );
  console.log(userBankAccount);
  config.initialForm.classList.add("d-none");
  config.bankPage.append(mainBankPage(userBankAccount));
}

function mainBankPage(userBankAccount) {
  const mainPage = document.createElement("div");
  mainPage.innerHTML = `
  <div id="page2">
        <div class="user-top">
          <div class="user-info">
            <p class="user-name">Your Name: ${userBankAccount.getFullName()}</p>
            <p class="user-id">Your Back ID: ${getRandomInteger(
              1,
              10000000
            )}</p>
            <p class="user-deposit">Your First Deposit: $${
              userBankAccount.initialDeposit
            }</p>
          </div>
          <div class="available-balance">
            <p class="available-balance-title">Available Balance</p>
            <p class="available-balance-amount">$${userBankAccount.money}</p>
          </div>
          <div class="items">
            <div class="withdrawal">
              <h2>WITHDRAWAL</h2>
              <i class="fas fa-wallet fa-3x"></i>
            </div>
            <div class="deposit">
              <h2>DEPOSIT</h2>
              <i class="fas fa-coins fa-3x"></i>
            </div>
            <div class="comebacklater">
              <h2>COMEBACK<br />LATER</h2>
              <i class="fas fa-home fa-3x"></i>
            </div>
          </div>
        </div>
      </div>
`;

  mainPage
    .querySelectorAll(".withdrawal")[0]
    .addEventListener("click", function () {
      sideBankSwitch();
      config.sidePage.append(withdrawPage(userBankAccount));
    });
  mainPage
    .querySelectorAll(".deposit")[0]
    .addEventListener("click", function () {
      sideBankSwitch();
      config.sidePage.append(depositPage(userBankAccount));
    });
  mainPage
    .querySelectorAll(".comebacklater")[0]
    .addEventListener("click", function () {
      sideBankSwitch();
      config.sidePage.append(comeBackLaterPage(userBankAccount));
    });

  return mainPage;
}

function billInputSelector(title) {
  let container = document.createElement("div");
  container.innerHTML = `
        
          <div class="withdrawal-title">
            <h1 class="">${title}</h1>
          </div>
          <div class="withdrawal-amount-selector">
            <div class="withdrawal-section">
              <p class="withdrawal-unit">$100</p>
              <input type="number" class="bill-input" data-bill="100" name="100-dollar" value="0" />
            </div>
            <div class="withdrawal-section">
              <p class="withdrawal-unit">$50</p>
              <input type="number" class="bill-input" data-bill="50" name="50-dollar" value="0" />
            </div>
            <div class="withdrawal-section">
              <p class="withdrawal-unit">$20</p>
              <input type="number" class="bill-input" data-bill="20" name="20-dollar" value="0" />
            </div>
            <div class="withdrawal-section">
              <p class="withdrawal-unit">$10</p>
              <input type="number" class="bill-input" data-bill="10" name="10-dollar" value="0" />
            </div>
            <div class="withdrawal-section">
              <p class="withdrawal-unit">$5</p>
              <input type="number" class="bill-input" data-bill="5" name="5-dollar" value="0" />
            </div>
            <div class="withdrawal-section">
              <p class="withdrawal-unit">$1</p>
              <input type="number" class="bill-input" data-bill="1" name="1-dollar" value="0" />
            </div>
          </div>
          <div class="total-amount">
            <p>$0.00</p>
          </div>
          
        
  `;
  return container;
}

function backNextBtn(backString, nextString) {
  let container = document.createElement("div");
  container.innerHTML = `
          <div class="next-page">
            <button class="go-back back-btn">${backString}</button>
            <button class="next next-btn">${nextString}</button>
          </div>
  `;
  return container;
}

function sideBankSwitch() {
  displayNone(config.bankPage);
  displayBlock(config.sidePage);
  config.bankPage.innerHTML = "";
  config.sidePage.innerHTML = "";
}

function bankReturn(userBankAccount) {
  displayNone(config.sidePage);
  displayBlock(config.bankPage);
  config.bankPage.append(mainBankPage(userBankAccount));
}

// function withdrawController(userBankAccount) {
//   displayNone(config.bankPage);
//   displayBlock(config.sidePage);
//   config.bankPage.innerHTML = "";
//   config.sidePage.innerHTML = "";
//   config.sidePage.append(withdrawPage(userBankAccount));
// }

function withdrawPage(userBankAccount) {
  let container = document.createElement("div");
  container.setAttribute("id", "page3");
  let withdrawContainer = document.createElement("div");
  withdrawContainer.classList.add("withdrawal-page");
  container.append(withdrawContainer);
  withdrawContainer.append(
    billInputSelector("Please Enter The Withdrawal Amount")
  );
  withdrawContainer.append(backNextBtn("back", "next"));

  let backBtn = withdrawContainer.querySelectorAll(".back-btn").item(0);
  backBtn.addEventListener("click", function () {
    // displayNone(config.sidePage);
    // displayBlock(config.bankPage);
    // config.bankPage.append(mainBankPage(userBankAccount));
    bankReturn(userBankAccount);
  });

  let billInputs = withdrawContainer.querySelectorAll(".bill-input");
  for (let i = 0; i < billInputs.length; i++) {
    billInputs[i].addEventListener("change", function () {
      document.querySelector(".total-amount").innerHTML = `
      $${billSummation(billInputs, "data-bill")}
      `;
    });
  }
  console.log(billInputs);

  let nextBtn = withdrawContainer.querySelectorAll(".next-btn").item(0);
  nextBtn.addEventListener("click", function () {
    container.innerHTML = "";
    container.setAttribute("id", "page4");
    let confirmDialog = document.createElement("div");
    confirmDialog.classList.add("confirmation-page");
    confirmDialog.append(
      billDialog(
        "The money you are going to take is ...",
        billInputs,
        "data-bill"
      )
    );
    container.append(confirmDialog);
    let total = billSummation(billInputs, "data-bill");
    confirmDialog.innerHTML += `
    <div class="available-amount">
      <p class="available-amount-title">Total to be withdrawn:</p>
      <p class="available-amount-total">$${userBankAccount.calculateWithdrawAmount(
        total
      )}</p>
    </div>
    `;
    let withdrawConfirmBtns = backNextBtn("Go Back", "Confirm");
    confirmDialog.append(withdrawConfirmBtns);

    let confirmBackBtn = withdrawConfirmBtns.querySelectorAll(".back-btn")[0];
    let confirmNextBtn = withdrawConfirmBtns.querySelectorAll(".next-btn")[0];

    confirmBackBtn.addEventListener("click", function () {
      container.innerHTML = "";
      container.append(withdrawContainer);
    });

    confirmNextBtn.addEventListener("click", function () {
      userBankAccount.withdraw(total);
      // displayNone(config.sidePage);
      // displayBlock(config.bankPage);
      // config.bankPage.append(mainBankPage(userBankAccount));
      bankReturn(userBankAccount);
    });
  });

  return container;
}

function billSummation(inputElementNodeList, multiplierAttribute) {
  let summation = 0;
  for (let i = 0; i < inputElementNodeList.length; i++) {
    let currEle = inputElementNodeList[i];
    let value = parseInt(currEle.value);

    if (currEle.hasAttribute(multiplierAttribute)) {
      value *= parseInt(currEle.getAttribute(multiplierAttribute));
    }
    if (value > 0) summation += value;
  }
  return summation;
}

function billDialog(title, inputElementNodeList, multiplierAttribute) {
  let container = document.createElement("div");

  let billElements = "";
  for (let i = 0; i < inputElementNodeList.length; i++) {
    let value = parseInt(inputElementNodeList[i].value);
    if (value > 0) {
      let bill =
        "$" + inputElementNodeList[i].getAttribute(multiplierAttribute);
      billElements += `
            <div class="confirmation-section">
              <p class="confirmation-unit">${value} × ${bill}</p>
            </div>
        `;
    }
  }
  let totalString = `
    <div class="confirmation-section">
    <p class="confirmation-total">total: $${billSummation(
      inputElementNodeList,
      multiplierAttribute
    )}</p>
    </div>
  `;
  container.innerHTML = `
          <div class="confirmation-title">
            <h1 class="">${title}</h1>
          </div>
          <div class="confirmation-amount-money">
          ${billElements}
          ${totalString}
          </div>  
  `;
  return container;
}

function depositPage(userBankAccount) {
  let container = document.createElement("div");
  container.setAttribute("id", "page3");
  let depositContainer = document.createElement("div");
  depositContainer.classList.add("withdrawal-page");
  container.append(depositContainer);
  depositContainer.append(billInputSelector("Please Enter The Deposit Amount"));
  depositContainer.append(backNextBtn("back", "next"));

  let backBtn = depositContainer.querySelectorAll(".back-btn").item(0);
  backBtn.addEventListener("click", function () {
    // displayNone(config.sidePage);
    // displayBlock(config.bankPage);
    // config.bankPage.append(mainBankPage(userBankAccount));
    bankReturn(userBankAccount);
  });

  let billInputs = depositContainer.querySelectorAll(".bill-input");
  for (let i = 0; i < billInputs.length; i++) {
    billInputs[i].addEventListener("change", function () {
      document.querySelector(".total-amount").innerHTML = `
      $${billSummation(billInputs, "data-bill")}
      `;
    });
  }

  let nextBtn = depositContainer.querySelectorAll(".next-btn").item(0);
  nextBtn.addEventListener("click", function () {
    container.innerHTML = "";
    container.setAttribute("id", "page4");
    let confirmDialog = document.createElement("div");
    confirmDialog.classList.add("confirmation-page");
    confirmDialog.append(
      billDialog(
        "The money you are going to deposit is ...",
        billInputs,
        "data-bill"
      )
    );
    container.append(confirmDialog);
    let total = billSummation(billInputs, "data-bill");
    confirmDialog.innerHTML += `
    <div class="available-amount">
      <p class="available-amount-title">Total to be depsited:</p>
      <p class="available-amount-total">$${userBankAccount.calculateWithdrawAmount(
        total
      )}</p>
    </div>
    `;
    let depositConfirmBtns = backNextBtn("Go Back", "Confirm");
    confirmDialog.append(depositConfirmBtns);

    let confirmBackBtn = depositConfirmBtns.querySelectorAll(".back-btn")[0];
    let confirmNextBtn = depositConfirmBtns.querySelectorAll(".next-btn")[0];

    confirmBackBtn.addEventListener("click", function () {
      container.innerHTML = "";
      container.append(depositContainer);
    });

    confirmNextBtn.addEventListener("click", function () {
      userBankAccount.deposit(total);
      // displayNone(config.sidePage);
      // displayBlock(config.bankPage);
      // config.bankPage.append(mainBankPage(userBankAccount));
      bankReturn(userBankAccount);
    });
  });

  return container;
}

function comeBackLaterPage(userBankAccount) {
  let container = document.createElement("div");
  container.setAttribute("id", "page6");
  comeBackContainer = document.createElement("div");
  comeBackContainer.classList.add("days-page");
  container.append(comeBackContainer);
  comeBackContainer.innerHTML = `
          <div class="days-title">
            <h1 class="">How many days will you be gone?</h1>
          </div>
          <div class="days-amount">
            <input id="days-gone" type="number" name="days" placeholder="0 days" />
          </div>
  `;
  comeBackContainer.append(backNextBtn("Back", "Confirm"));

  let backBtn = container.querySelectorAll(".back-btn")[0];
  backBtn.addEventListener("click", function () {
    bankReturn(userBankAccount);
  });

  let nextBtn = container.querySelectorAll(".next-btn")[0];
  nextBtn.addEventListener("click", function () {
    let daysGoneInput = container.querySelectorAll("#days-gone")[0];
    let totalDaysGone = parseInt(daysGoneInput.value);
    totalDaysGone = totalDaysGone > 0 ? totalDaysGone : 0;
    userBankAccount.simulateTimePassage(totalDaysGone);
    bankReturn(userBankAccount);
  });

  return container;
}
