const cfg=window.AHBAB_CONFIG||{};
const digits=s=>String(s||'').replace(/\D/g,'');
const wa=digits(cfg.whatsapp),phone=digits(cfg.phone);
const notice=document.getElementById('configNotice');
const whatsappUrl=msg=>`https://wa.me/${wa}?text=${encodeURIComponent(msg)}`;
function sendWa(msg){if(!wa){notice.hidden=false;notice.scrollIntoView({behavior:'smooth',block:'center'});return;}window.open(whatsappUrl(msg),'_blank','noopener,noreferrer');}
document.querySelectorAll('[data-whatsapp]').forEach(a=>{a.href=wa?whatsappUrl(a.dataset.whatsapp):'#booking';a.addEventListener('click',e=>{if(!wa){e.preventDefault();sendWa(a.dataset.whatsapp)}})});
document.getElementById('bookingForm').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);sendWa(`السلام عليكم، طلب من تطبيق أحباب مكة\nالاسم: ${f.get('name')}\nالهاتف: ${f.get('phone')}\nالرحلة: ${f.get('trip')}\nملاحظات: ${f.get('notes')||'لا توجد'}`)});
if(phone){document.getElementById('phoneText').textContent='+'+phone;const a=document.getElementById('callLink');a.hidden=false;a.href='tel:+'+phone;}
if(wa){const a=document.getElementById('waLink');a.hidden=false;a.href=whatsappUrl('السلام عليكم، أريد الاستفسار عن رحلات أحباب مكة');}
document.getElementById('year').textContent=new Date().getFullYear();
let installPrompt;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;document.getElementById('install').hidden=false});document.getElementById('install').addEventListener('click',async()=>{if(!installPrompt)return;installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;document.getElementById('install').hidden=true});window.addEventListener('appinstalled',()=>document.getElementById('install').hidden=true);
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
