const customerList = document.getElementById('customer-list');
const newCustomerForm = document.getElementById('new-customer-form');
const editCustomerForm = document.getElementById('edit-customer-form');

getCustomers();

// submit new customer
newCustomerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addCustomer({
    fullName: newCustomerForm.fullName.value,
    email: newCustomerForm.email.value,
    birthDate: newCustomerForm.birthDate.value,
    notes: newCustomerForm.notes.value,
  });
  getCustomers();
  newCustomerForm.reset();
});

// add customer
function addCustomer(customer) {
  fetch('/customer', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customer),
  });
}

// render each customer to the table
function buildCustomerRow(customer, index) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${index + 1}</td>
    <td>${customer.fullName}</td>
    <td>${customer.email}</td>
    <td>${customer.birthDate}</td>
    <td>${customer.createdOn.slice(0, 10)}</td>
    <td><i class="fa fa-edit"></i><i class="fas fa-trash-alt"></i></td>`;
  row.querySelector('.fa-trash-alt').addEventListener('click', () => {
    deleteCustomer(customer._id);
  });
  row
    .querySelector('.fa-edit')
    .addEventListener('click', () => editCustomer(customer));
  return row;
}

// edit customer
function editCustomer(customer, e) {
  toggleEditBackdrop();
  editCustomerForm.fullName.value = customer.fullName;
  editCustomerForm.email.value = customer.email;
  editCustomerForm.birthDate.value = customer.birthDate;
  editCustomerForm.notes.value = customer.notes;
  editCustomerForm.addEventListener('submit', (e) => {
    updateCustomer(
      editCustomerForm.fullName.value,
      editCustomerForm.email.value,
      editCustomerForm.birthDate.value,
      editCustomerForm.notes.value,
      customer._id
    );
  });
}

// fetch post requst to server
function updateCustomer(fullName, email, birthDate, notes, id) {
  const data = { fullName, email, birthDate, notes };
  fetch(`/customer/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

// delete customer
function deleteCustomer(id) {
  fetch(`/customer/${id}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
      getCustomers();
    })
    .catch((err) => {
      console.log('Error:', err);
    });
}

// get customers
function getCustomers() {
  removeList();
  fetch('/customer')
    .then((response) => response.json())
    .then((customersArr) => {
      customersArr.map((customer, index) => {
        const row = buildCustomerRow(customer, index);
        customerList.appendChild(row);
      });
    });
}

// remove list each render
function removeList() {
  customerList.innerHTML = '';
}

// toggle editBackdrop
function toggleEditBackdrop() {
  const editBackdrop = document.getElementById('edit-backdrop');
  editBackdrop.classList.toggle('visible');
}
