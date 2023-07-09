//tạo chuỗi rỗng chứa danh sách nv
let users = [];

let isSubmitted = false;

//add user
function addUser() {
  isSubmitted = true;

  //1.dom
  let account = document.getElementById("tknv").value;
  let userName = document.getElementById("name").value;
  let mail = document.getElementById("email").value;
  let pass = document.getElementById("password").value;
  let date = document.getElementById("datepicker").value;
  let salary = document.getElementById("luongCB").value;
  let position = document.getElementById("chucvu").value;
  let time = document.getElementById("gioLam").value;

  //2. khởi tạo đối tượng
  let user = new User(
    account,
    userName,
    mail,
    pass,
    date,
    salary,
    position,
    time
  );

  let isValid = validate(user);

  if (!isValid) {
    return;
  }

  //3. thêm đối tượng student vào chuỗi rỗng
  users.push(user);

  //4. hiển thị lên giao diện
  display(users);

  // 5. reset
  resetForm();
}

// display function
function display(users) {
  let html = users.reduce((result, value) => {
    return (
      result +
      `
        <tr>
            <td>${value.account}</td>
            <td>${value.userName}</td>
            <td>${value.mail}</td>
            <td>${value.date}</td>
            <td>${value.position}</td>
            <td>${value.calSalary()}</td>
            <td>${value.rate()}</td>
            <td class = "d-flex" >
              <button class = "btn btn-danger" onclick = "deleteUser('${
                value.mail
              }')" >Xoá</button>

              <button class = "btn btn-success" data-toggle="modal" data-target="#myModal" onclick = "updateUser('${
                value.mail
              }')">Cập nhật</button>
            </td>
        </tr>
        `
    );
  }, "");

  document.getElementById("tableDanhSach").innerHTML = html;
}

// empty check
function isRequired(value) {
  if (!value.trim()) {
    return false;
  }
  return true;
}

// input check
function position(value) {
  if (!(value == "sep" || value == "truongPhong" || value == "nhanVien")) {
    return false;
  }
  return true;
}

//letters check
function allLetter(input) {
  let regex = /^[A-Za-z\s]*$/;
  if (regex.test(input)) {
    return true;
  }
  return false;
}

//email check
function emailCheck(input) {
  let regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (regex.test(input)) {
    return true;
  }
  return false;
}

// length check
function lengthCheck(value) {
  if (value.length < 4 || value.length > 6) {
    return false;
  }
  return true;
}

// salary check
function salaryCheck(value) {
  if (value >= 1e6 && value <= 2e7) {
    return true;
  }
  return false;
}

//working time check
function timeCheck(value) {
  if (value >= 80 && value <= 200) {
    return true;
  }
  return false;
}

// password check
function passCheck(input) {
  let regex =
    /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  if (regex.test(input)) {
    return true;
  }
  return false;
}

// date check
function dateCheck(input) {
  let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  if (regex.test(input)) {
    return true;
  }
  return false;
}

// ----------------- Validation ----------------- //
function validate(user) {
  let isValid = true;

  if (!isRequired(user.account)) {
    isValid = false;
    document.getElementById("tbTKNV").innerHTML =
      "Tên tài khoản không được để trống";
  } else if (!lengthCheck(user.account)) {
    isValid = false;
    document.getElementById("tbTKNV").innerHTML =
      "Tài khoản tối đa 4 - 6 ký số";
  }

  if (!isRequired(user.userName)) {
    isValid = false;
    document.getElementById("tbTen").innerHTML = "Họ tên không được để trống";
  } else if (!allLetter(user.userName)) {
    isValid = false;
    document.getElementById("tbTen").innerHTML = "Tên nhân viên phải là chữ";
  }

  if (!isRequired(user.mail)) {
    isValid = false;
    document.getElementById("tbEmail").innerHTML = "Email không được để trống";
  } else if (!emailCheck(user.mail)) {
    isValid = false;
    document.getElementById("tbEmail").innerHTML = "Email phải đúng định dạng";
  }

  if (!isRequired(user.pass)) {
    isValid = false;
    document.getElementById("tbMatKhau").innerHTML =
      "Password không được để trống";
  } else if (!passCheck(user.pass)) {
    isValid = false;
    document.getElementById("tbMatKhau").innerHTML =
      " mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt),";
  }

  if (!isRequired(user.date)) {
    isValid = false;
    document.getElementById("tbNgay").innerHTML =
      "Ngày làm không được để trống";
  } else if (!dateCheck(user.date)) {
    isValid = false;
    document.getElementById("tbNgay").innerHTML = "Định dạng mm/dd/yyyy";
  }

  if (!isRequired(user.salary)) {
    isValid = false;
    document.getElementById("tbLuongCB").innerHTML =
      "Tiền lương không được để trống";
  } else if (!salaryCheck(user.salary)) {
    isValid = false;
    document.getElementById("tbLuongCB").innerHTML =
      " Lương cơ bản 1 000 000 - 20 000 000";
  }

  if (!position(user.position)) {
    isValid = false;
    document.getElementById("tbChucVu").innerHTML = "Phải chọn chức vụ hợp lệ";
  }

  if (!isRequired(user.time)) {
    isValid = false;
    document.getElementById("tbGiolam").innerHTML =
      "Giờ làm không được đê trống";
  } else if (!timeCheck(user.time)) {
    isValid = false;
    document.getElementById("tbGiolam").innerHTML =
      "Số giờ làm trong tháng 80 - 200 giờ";
  }

  return isValid;
}

// delet user
function deleteUser(email) {
  let index = users.indexOf((value) => {
    return value.mail === email;
  });
  users.splice(index, 1);

  display(users);
}

// Update User
function updateUser(email) {
  let selectedUser = users.find((value) => {
    return value.mail === email;
  });
  document.getElementById("tknv").innerHTML = selectedUser.account;
  document.getElementById("name").innerHTML = selectedUser.userName;
  document.getElementById("email").innerHTML = selectedUser.mail;
  document.getElementById("password").innerHTML = selectedUser.pass;
  document.getElementById("datepicker").innerHTML = selectedUser.date;
  document.getElementById("luongCB").innerHTML = selectedUser.salary;
  document.getElementById("chucvu").innerHTML = selectedUser.position;
  document.getElementById("gioLam").innerHTML = selectedUser.time;
}

// reset form
function resetForm() {
  document.getElementById("tknv").innerHTML = "";
  document.getElementById("name").innerHTML = "";
  document.getElementById("email").innerHTML = "";
  document.getElementById("password").innerHTML = "";
  document.getElementById("datepicker").innerHTML = "";
  document.getElementById("luongCB").innerHTML = "";
  document.getElementById("chucvu").innerHTML = "";
  document.getElementById("gioLam").innerHTML = "";
}

//-----------------sự kiện oninput-----------------//
document.getElementById("tknv").oninput = (event) => {
  if (!isSubmitted) return;

  let idSpan = document.getElementById("tbTKNV");
  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  } else {
    idSpan.innerHTML = "Tên tài khoản không được để trống";
  }
};
