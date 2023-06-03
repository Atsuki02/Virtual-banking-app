function displayNone(ele) {
  ele.classList.remove("d-block");
  ele.classList.add("d-none");
}

function displayBlock(ele) {
  ele.classList.remove("d-none");
  ele.classList.add("d-block");
}

const config = {
  target: document.getElementById("target"),
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
  config.page0.classList.add("d-none");
  config.target.append(mainBankPage(userBankAccount));
}

function mainBankPage(userBandAccount) {
  const mainPage = document.createElement("div");
  mainPage.innerHTML = `
  <div id="page2">
        <div class="user-top">
          <div class="user-info">
            <p class="user-name">Your Name: ${userBandAccount.getFullName()}</p>
            <p class="user-id">Your Back ID: ${getRandomInteger(
              1,
              10000000
            )}</p>
            <p class="user-deposit">Your First Deposit: $${
              userBandAccount.initialDeposit
            }</p>
          </div>
          <div class="available-balance">
            <p class="available-balance-title">Available Balance</p>
            <p class="available-balance-amount">$${
              userBandAccount.initialDeposit
            }</p>
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
      alert("deposit");
    });
  mainPage
    .querySelectorAll(".deposit")[0]
    .addEventListener("click", function () {
      alert("deposit");
    });
  mainPage
    .querySelectorAll(".comebacklater")[0]
    .addEventListener("click", function () {
      alert("comebacklater");
    });

  return mainPage;
}

function billInputSelector(title) {
  let container = document.createElement("div");
  container.innerHTML = `
  <div class="withdrawal-page">
          <div class="withdrawal-title">
            <h1 class="">${title}</h1>
          </div>
          <div class="withdrawal-amount-selector">
            <div class="withdrawal-section">
              <p class="withdrawal-unit">$100</p>
              <input type="number" name="100-dollar" value="5" />
            </div>
            <div class="withdrawal-section">
              <p class="withdrawal-unit">$50</p>
              <input type="number" name="50-dollar" value="1" />
            </div>
            <div class="withdrawal-section">
              <p class="withdrawal-unit">$20</p>
              <input type="number" name="20-dollar" value="2" />
            </div>
            <div class="withdrawal-section">
              <p class="withdrawal-unit">$10</p>
              <input type="number" name="10-dollar" value="3" />
            </div>
            <div class="withdrawal-section">
              <p class="withdrawal-unit">$5</p>
              <input type="number" name="5-dollar" value="1" />
            </div>
            <div class="withdrawal-section">
              <p class="withdrawal-unit">$1</p>
              <input type="number" name="1-dollar" value="4" />
            </div>
          </div>
          <div class="total-amount">
            <p>$0.00</p>
          </div>
          
        </div>
  `;
  return container;
}

function backNextBtn(backString, nextString) {
  let container = document.createElement("div");
  container.innerHTML = `
          <div class="next-page">
            <button class="go-back">${backString}</button>
            <button class="next">${nextString}</button>
          </div>
  `;
  return container;
}

function withdrawPage() {
  let withdrawContainer = document.createElement("div");

  withdrawContainer.append(
    billInputSelector("Please Enter The Withdrawal Amount")
  );
  withdrawContainer.append(backNextBtn("back", "next"));

  return withdrawContainer;
}

// withdrawPage();

function withdrawController() {
  displayNone(config.bankPage);
    displayBlock(config.sidePage);
  const withdrawalPage = document.createElement("div");
  withdrawalPage.innerHTML =
}
