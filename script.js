const config = {
  target: document.getElementById("target"),
  page0: document.getElementById("page0"),
  page1: document.getElementById("page1"),
  page2: document.getElementById("page2"),
  page3: document.getElementById("page3"),
  page4: document.getElementById("page4"),
  page5: document.getElementById("page5"),
  page6: document.getElementById("page6"),
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
  mainBankPage(userBankAccount);
}

function mainBankPage(userBandAccount) {
  const mainPage = document.createElement("div");
  mainPage.innerHTML = `
  <div id="page2">
        <div class="user-top">
          <div class="user-info">
            <p class="user-name">Your Name: Kaiden Herman</p>
            <p class="user-id">Your Back ID: 12345678</p>
            <p class="user-deposit">Your First Deposit: $205.00</p>
          </div>
          <div class="available-balance">
            <p class="available-balance-title">Available Balance</p>
            <p class="available-balance-amount">$12,345</p>
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
  config.target.append(mainPage);
}
