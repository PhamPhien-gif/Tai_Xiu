var Container;
var count=0;
var nguoiChoi;
var Container2;
var Tai;
var Xiu;
function RandomNumber() {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    return randomNumber;
}

  

function getRandomNumber() {
    if(count%3!=0){
        count++;
        return RandomNumber();
    }
    count++;
    const currentTime = new Date(); // Lấy thời gian hiện tại
    const seconds = currentTime.getSeconds(); // Lấy giây hiện tại
    const milliseconds = currentTime.getMilliseconds(); // Lấy mili giây
  
    // Tính phần trăm từ giây thứ 2
    const percentage = (seconds + milliseconds / 1000) % 1; // Phần trăm trong giây (0 đến 1)
  
    // Chuyển đổi phần trăm thành số ngẫu nhiên từ 1 đến 6
    const randomNumber = Math.floor(percentage * 6) + 1;
  
    return randomNumber;
}

class Die{
    constructor(){
        this.Number= getRandomNumber();
        this.element=document.createElement('div');
        this.string_picture= "xs" + this.Number;
        this.element.classList.add(this.string_picture);
    }
}

var arr= new Array(3);
for(let i=0;i<3;i++){
    arr[i]= new Die();
}

function Sum(){
    var sum=0;
    for(let i=0;i<3;i++){
        sum+=arr[i].Number;
    }
    return sum;
}

function KetQua(){
    if(Sum()>=11) return 1;
    return 2;
}

class Casino{
    
}

class Player{
    constructor(){
        this.Money=1000;
    }
}

var p = new Player();
var Tai_Xiu=0;

function PlayGame(){
    for(let i=0;i<3;i++){
        arr[i].element.remove();
    }
    for(let i=0;i<3;i++){
        arr[i]= new Die();
        Container.appendChild(arr[i].element);
    }
}

function CapNhat(x){
    Tai.classList.remove('button2');
    Xiu.classList.remove('button2');
    var string;
    if(KetQua()==1) string= " Tài";
    else string =" Xỉu";
    nguoiChoi.innerText= "Tổng: "+ x + "- " + string +     "\nSố tiền còn lại: " + p.Money;
    Tai_Xiu=0;
}

function processNumber() {
    // Lấy giá trị từ thanh nhập số
    const userInput = document.getElementById('userNumber').value;
  
    // Kiểm tra xem người dùng đã nhập số hợp lệ chưa
    if (userInput === "") {
      alert("Vui lòng nhập một số!");
      return;
    }
    if(userInput>p.Money){
        alert("Số tiền cược lớn hơn hiện có");
        return;
    }
    if(Tai_Xiu==0){
        alert("Chưa đặt ô cược");
        return;
    }
    // Chuyển đổi giá trị thành số và xử lý
    const number = parseInt(userInput);
  
    if (isNaN(number)) {
      alert("Vui lòng nhập một số hợp lệ!");
      return;
    }
    
    PlayGame();
    if(Tai_Xiu==KetQua()){
        p.Money+=number;
        CapNhat(Sum());
    }
    else{
        p.Money-=number;
        CapNhat(Sum());
    }

    return number;
  }
  

document.addEventListener("DOMContentLoaded", function () {
    Container = document.getElementById('Sic_Bo');
    Container.classList.add('Container');
    for(let i=0;i<3;i++){
        Container.appendChild(arr[i].element);
    }
    

    Tai= document.createElement('button');
    Tai.innerText="Tài";
    Tai.addEventListener('click', function() {
        Tai_Xiu=1;
        Tai.classList.add('button2');
    });
    Xiu= document.createElement('button');
    Xiu.innerText="Xỉu";
    Xiu.addEventListener('click', function() {
        Tai_Xiu=2;
        Xiu.classList.add('button2');
    });

    Container2= document.getElementById('Query');

    Container2.appendChild(Tai);
    Container2.appendChild(Xiu);

    nguoiChoi= document.createElement('div');
    nguoiChoi.innerText= "Số tiền còn lại: " + p.Money;
    Container2.appendChild(nguoiChoi);


});
