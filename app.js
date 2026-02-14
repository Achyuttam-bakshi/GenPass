// Dark Mode
function toggleMode() {
  document.body.classList.toggle('dark-mode');
  const mode = document.body.classList.contains('dark-mode') ? 'dark':'light';
  localStorage.setItem('mode',mode);
  document.querySelectorAll('#mode-toggle').forEach(btn=>btn.textContent = mode==='dark'?'Light Mode':'Dark Mode');
}

window.addEventListener('DOMContentLoaded',()=>{
  if(localStorage.getItem('mode')==='dark') document.body.classList.add('dark-mode');
  document.querySelectorAll('#mode-toggle').forEach(btn=>btn.textContent = document.body.classList.contains('dark-mode')?'Light Mode':'Dark Mode');
  document.querySelector('.user-greeting')?.classList.add('fadeIn');
  loadHistory();
});

// Greeting
function updateGreeting(){
  const userGreeting=document.querySelector('.user-greeting');
  userGreeting && (userGreeting.textContent="Hello, User");
}

// Password generator
function generate(){
  const length=parseInt(document.getElementById('length').value)||12;
  const custom=document.getElementById('custom').value||'';
  const level=document.getElementById('level').value;
  const output=document.getElementById('output').querySelector('span');

  const sets={
    1:"abcdefghijklmnopqrstuvwxyz",
    2:"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    3:"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    4:"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()",
    5:"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*(){}[]<>?/|~`"
  };

  let chars=sets[level];
  let password=custom;
  while(password.length<length) password+=chars[Math.floor(Math.random()*chars.length)];
  password=password.split('').sort(()=>0.5-Math.random()).join('');
  output.textContent=password;

  const strengthBar=document.getElementById('strength-fill');
  const strength=Math.min(length*level*3,100);
  strengthBar.style.width=strength+'%';
  strengthBar.style.background=strength<30?'red':strength<60?'orange':strength<80?'yellowgreen':'green';

  savePassword(password);
}

// Lucky password
function luckyPassword(){
  const adjectives=['Lucky','Magic','Epic','Fun','Star','Golden','Power'];
  const adj=adjectives[Math.floor(Math.random()*adjectives.length)];
  const pass=adj+Math.floor(Math.random()*10000);
  document.getElementById('output').querySelector('span').textContent=pass;
  savePassword(pass);
}

// Copy password
function copyPassword(){
  const pass=document.getElementById('output').querySelector('span').textContent;
  navigator.clipboard.writeText(pass);
  alert('Password copied!');
}

// History
function savePassword(password){
  const now=new Date().toLocaleString();
  const history=JSON.parse(localStorage.getItem('passwordHistory'))||[];
  history.push({password,date:now});
  localStorage.setItem('passwordHistory',JSON.stringify(history));
}

function loadHistory(){
  const list=document.getElementById('history-list');
  if(!list) return;
  list.innerHTML='';
  const history=JSON.parse(localStorage.getItem('passwordHistory'))||[];
  history.forEach((item,i)=>{
    const li=document.createElement('li');
    li.className='history-item';
    li.innerHTML=`
      <span>${item.date}</span>
      <span>${item.password}</span>
      <div>
        <button onclick="copyHistory(${i})">Copy</button>
        <button onclick="deleteHistory(${i})">Delete</button>
      </div>`;
    list.appendChild(li);
    setTimeout(()=>li.classList.add('show'),50*i); // animation stagger
  });
}

function copyHistory(i){
  const history=JSON.parse(localStorage.getItem('passwordHistory'))||[];
  if(!history[i]) return;
  navigator.clipboard.writeText(history[i].password);
  alert('Password copied!');
}

function deleteHistory(i){
  const history=JSON.parse(localStorage.getItem('passwordHistory'))||[];
  if(!history[i]) return;
  history.splice(i,1);
  localStorage.setItem('passwordHistory',JSON.stringify(history));
  loadHistory();
}
