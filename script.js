/* =========================================================
   RIFORA PREMIUM — script.js (buyer app / index.html)
   ========================================================= */

(function(){
  'use strict';

  /* ---------- State ---------- */
  let brands = [];
  let currentDetailBrand = null;
  let selectedPkg = null;
  let qty = 1;
  let bannerIdx = 0;
  let bannerTimer = null;
  let activeCategory = 'Semua';
  let activeCategoryProduk = 'Semua';

  const WA_NUMBERS = () => RiforaData.getSettings().admins || [];

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    brands = RiforaData.getBrands();
    renderBanners();
    renderCategoryChips();
    renderPopular();
    renderNewest();
    renderPromos();
    renderTestimonials();
    renderFaqs();
    renderProdukView();
    renderFavorites();
    renderProfile();
    initChat();
    bindNav();
    bindGlobalEvents();
    if (window.lucide) lucide.createIcons();
  });

  /* ---------- Toast ---------- */
  function toast(msg){
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
  }

  /* ---------- Navigation between views ---------- */
  function bindNav(){
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        showView(btn.dataset.view);
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
    document.getElementById('aiTeaser').addEventListener('click', () => {
      showView('ai');
      document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
      document.querySelector('.nav-item[data-view="ai"]').classList.add('active');
    });
    document.getElementById('detailBack').addEventListener('click', () => {
      showView('produk');
      document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
      document.querySelector('.nav-item[data-view="produk"]').classList.add('active');
    });
  }

  function showView(name){
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + name).classList.add('active');
    window.scrollTo({top:0, behavior:'smooth'});
  }

  /* ---------- Category helpers ---------- */
  function getCategories(){
    const set = new Set(brands.map(b => b.category));
    return ['Semua', ...Array.from(set)];
  }

  function renderCategoryChips(){
    const wrap = document.getElementById('categoryChips');
    wrap.innerHTML = getCategories().map(cat =>
      `<button class="chip ${cat===activeCategory?'active':''}" data-cat="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`
    ).join('');
    wrap.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        activeCategory = chip.dataset.cat;
        renderCategoryChips();
        renderPopular();
        renderNewest();
      });
    });
  }

  function filterByCategory(list, cat){
    if (cat === 'Semua') return list;
    return list.filter(b => b.category === cat);
  }

  /* ---------- Banners (auto slide + parallax dots) ---------- */
  function renderBanners(){
    const banners = RiforaData.getBanners();
    const track = document.getElementById('bannerTrack');
    const dots = document.getElementById('bannerDots');
    track.innerHTML = banners.map(b => `
      <div class="banner-slide color-${b.color}">
        <h3>${escapeHtml(b.title)}</h3>
        <p>${escapeHtml(b.subtitle)}</p>
      </div>
    `).join('');
    dots.innerHTML = banners.map((_, i) => `<span class="${i===0?'active':''}"></span>`).join('');

    clearInterval(bannerTimer);
    if (banners.length > 1){
      bannerTimer = setInterval(() => {
        bannerIdx = (bannerIdx + 1) % banners.length;
        updateBannerPosition();
      }, 4000);
    }
  }
  function updateBannerPosition(){
    const track = document.getElementById('bannerTrack');
    track.style.transform = `translateX(-${bannerIdx * 100}%)`;
    document.querySelectorAll('#bannerDots span').forEach((d,i) => d.classList.toggle('active', i===bannerIdx));
  }

  /* ---------- Brand card renderer ---------- */
  function badgeClass(badge){
    if (badge === 'HOT') return 'hot';
    if (badge === 'NEW') return 'new';
    return '';
  }

  function brandCardHtml(b){
    const favs = RiforaData.getFavorites();
    const isFav = favs.includes(b.id);
    return `
      <div class="brand-card" data-id="${b.id}">
        ${b.badge ? `<span class="badge ${badgeClass(b.badge)}">${escapeHtml(b.badge)}</span>` : ''}
        <div class="logo"><img src="${b.logo}" alt="${escapeHtml(b.name)}"></div>
        <h3>${escapeHtml(b.name)}</h3>
        <div class="cat">${escapeHtml(b.category)}</div>
        <div class="desc">${escapeHtml(b.description).slice(0,70)}${b.description.length>70?'…':''}</div>
        <div class="foot">
          <span>${b.packages.length} Paket</span>
          <button class="fav-btn ${isFav?'active':''}" data-fav="${b.id}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${isFav?'currentColor':'none'}" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
          </button>
        </div>
      </div>
    `;
  }

  function attachCardEvents(container){
    container.querySelectorAll('.brand-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('[data-fav]')) return;
        openDetail(card.dataset.id);
      });
    });
    container.querySelectorAll('[data-fav]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(btn.dataset.fav);
      });
    });
  }

  function toggleFavorite(id){
    let favs = RiforaData.getFavorites();
    if (favs.includes(id)){
      favs = favs.filter(f => f !== id);
      toast('Dihapus dari favorit');
    } else {
      favs.push(id);
      toast('Ditambahkan ke favorit');
    }
    RiforaData.setFavorites(favs);
    renderPopular(); renderNewest(); renderProdukView(); renderFavorites();
  }

  function renderPopular(){
    const list = filterByCategory(brands.filter(b => b.badge === 'BEST SELLER' || b.badge === 'HOT'), activeCategory);
    const wrap = document.getElementById('popularRow');
    wrap.innerHTML = (list.length ? list : brands.slice(0,4)).map(brandCardHtml).join('');
    attachCardEvents(wrap);
  }

  function renderNewest(){
    const list = filterByCategory([...brands].reverse(), activeCategory);
    const wrap = document.getElementById('newestRow');
    wrap.innerHTML = list.slice(0,6).map(brandCardHtml).join('');
    attachCardEvents(wrap);
  }

  /* ---------- Produk view (full grid + search) ---------- */
  function renderProdukView(){
    const chipsWrap = document.getElementById('produkChips');
    chipsWrap.innerHTML = getCategories().map(cat =>
      `<button class="chip ${cat===activeCategoryProduk?'active':''}" data-cat="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`
    ).join('');
    chipsWrap.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        activeCategoryProduk = chip.dataset.cat;
        renderProdukView();
      });
    });

    const search = document.getElementById('produkSearch').value.toLowerCase();
    let list = filterByCategory(brands, activeCategoryProduk);
    if (search) list = list.filter(b => b.name.toLowerCase().includes(search));

    const grid = document.getElementById('produkGrid');
    if (!list.length){
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><p>Brand tidak ditemukan.</p></div>`;
      return;
    }
    grid.innerHTML = list.map(brandCardHtml).join('');
    attachCardEvents(grid);
  }
  document.addEventListener('input', (e) => {
    if (e.target.id === 'produkSearch') renderProdukView();
    if (e.target.id === 'dashSearch'){
      const val = e.target.value.toLowerCase();
      if (val.length > 1){
        showView('produk');
        document.getElementById('produkSearch').value = e.target.value;
        renderProdukView();
      }
    }
  });

  /* ---------- Favorit view ---------- */
  function renderFavorites(){
    const favs = RiforaData.getFavorites();
    const list = brands.filter(b => favs.includes(b.id));
    const grid = document.getElementById('favoritGrid');
    const empty = document.getElementById('favoritEmpty');
    if (!list.length){
      grid.innerHTML = '';
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';
    grid.innerHTML = list.map(brandCardHtml).join('');
    attachCardEvents(grid);
  }

  /* ---------- Promo / Testimoni / FAQ ---------- */
  function renderPromos(){
    const promos = RiforaData.getPromos().filter(p => p.active);
    const wrap = document.getElementById('promoList');
    if (!promos.length){ wrap.innerHTML = ''; return; }
    wrap.innerHTML = promos.map(p => `
      <div class="promo-card">
        <div class="icon">🎁</div>
        <div><h4>${escapeHtml(p.title)}</h4><p>${escapeHtml(p.desc)}</p></div>
      </div>
    `).join('');
  }

  function renderTestimonials(){
    const testis = RiforaData.getTestimonials();
    const wrap = document.getElementById('testiRow');
    wrap.innerHTML = testis.map(t => `
      <div class="testi-card">
        <div class="stars">${'★'.repeat(t.rating)}${'☆'.repeat(5-t.rating)}</div>
        <p>"${escapeHtml(t.text)}"</p>
        <div class="name">${escapeHtml(t.name)}</div>
      </div>
    `).join('');
  }

  function renderFaqs(){
    const faqs = RiforaData.getFaqs();
    const wrap = document.getElementById('faqList');
    wrap.innerHTML = faqs.map(f => `
      <div class="faq-item">
        <div class="faq-q">${escapeHtml(f.q)}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
        </div>
        <div class="faq-a">${escapeHtml(f.a)}</div>
      </div>
    `).join('');
    wrap.querySelectorAll('.faq-item').forEach(item => {
      item.querySelector('.faq-q').addEventListener('click', () => item.classList.toggle('open'));
    });
  }

  /* ---------- Detail view ---------- */
  function openDetail(id){
    currentDetailBrand = brands.find(b => b.id === id);
    if (!currentDetailBrand) return;
    selectedPkg = currentDetailBrand.packages[0] || null;
    qty = 1;

    document.getElementById('detailLogo').src = currentDetailBrand.logo;
    document.getElementById('detailName').textContent = currentDetailBrand.name;
    document.getElementById('detailDesc').textContent = currentDetailBrand.description;
    renderPkgList();
    updateQtyUI();
    updateTotal();
    showView('detail');
  }

  function renderPkgList(){
    const wrap = document.getElementById('detailPkgList');
    if (!currentDetailBrand.packages.length){
      wrap.innerHTML = `<div class="empty-state"><p>Belum ada paket untuk brand ini.</p></div>`;
      return;
    }
    wrap.innerHTML = currentDetailBrand.packages.map(p => `
      <div class="pkg-item ${selectedPkg && selectedPkg.id===p.id ? 'selected':''}" data-pkg="${p.id}">
        <div class="pkg-radio"></div>
        <div class="pkg-info">
          <div class="pname">${escapeHtml(p.name)}</div>
          <div class="pmeta">Garansi ${escapeHtml(p.warranty || '-')}${p.note ? ' • ' + escapeHtml(p.note) : ''}</div>
        </div>
        <div class="pkg-price">${RiforaData.formatRupiah(p.price)}</div>
      </div>
    `).join('');
    wrap.querySelectorAll('.pkg-item').forEach(el => {
      el.addEventListener('click', () => {
        selectedPkg = currentDetailBrand.packages.find(p => p.id === el.dataset.pkg);
        renderPkgList();
        updateTotal();
      });
    });
  }

  function updateQtyUI(){ document.getElementById('qtyVal').textContent = qty; }
  function updateTotal(){
    const total = selectedPkg ? selectedPkg.price * qty : 0;
    document.getElementById('detailTotal').textContent = RiforaData.formatRupiah(total);
  }

  document.addEventListener('click', (e) => {
    if (e.target.id === 'qtyPlus'){ qty = Math.min(qty+1, 99); updateQtyUI(); updateTotal(); }
    if (e.target.id === 'qtyMinus'){ qty = Math.max(qty-1, 1); updateQtyUI(); updateTotal(); }
  });

  /* ---------- Order bottom sheet + WhatsApp ---------- */
  function openOrderSheet(){
    if (!selectedPkg){ toast('Pilih paket terlebih dahulu'); return; }
    const admins = WA_NUMBERS();
    const list = document.getElementById('adminPickList');
    list.innerHTML = admins.map((a, i) => `
      <div class="admin-pick" data-idx="${i}">
        <div><div class="who">${escapeHtml(a.name)}</div><div class="num">${escapeHtml(a.phone)}</div></div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5C11 9 10.5 7.7 10.3 7.2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.6-.7 1.9-1.3.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3z"/><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2z"/></svg>
      </div>
    `).join('');
    list.querySelectorAll('.admin-pick').forEach(el => {
      el.addEventListener('click', () => sendToWhatsApp(admins[+el.dataset.idx]));
    });
    document.getElementById('orderOverlay').classList.add('show');
    document.getElementById('orderSheet').classList.add('show');
  }
  function closeOrderSheet(){
    document.getElementById('orderOverlay').classList.remove('show');
    document.getElementById('orderSheet').classList.remove('show');
  }
  document.getElementById('orderOverlay') && document.getElementById('orderOverlay').addEventListener('click', closeOrderSheet);

  function sendToWhatsApp(admin){
    const total = selectedPkg.price * qty;
    const msg = `Halo Admin Rifora Premium,\n\nSaya ingin membeli\n\nBrand : ${currentDetailBrand.name}\nPaket : ${selectedPkg.name}\nJumlah : ${qty}\nTotal : ${RiforaData.formatRupiah(total)}\n\nMohon diproses.\nTerima kasih.`;
    const phone = admin.phone.replace(/^0/, '62').replace(/\D/g,'');
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    closeOrderSheet();
    window.open(url, '_blank');
  }

  /* ---------- AI Assistant (rule-based) ---------- */
  function initChat(){
    const wrap = document.getElementById('chatWrap');
    addChatMsg(wrap, 'bot', 'Halo! Saya AI Assistant Rifora Premium 🤖\nAda yang bisa saya bantu? Tanyakan soal harga, cara order, garansi, produk, atau jam operasional.');
  }
  function addChatMsg(wrap, who, text){
    const div = document.createElement('div');
    div.className = `chat-msg ${who}`;
    div.textContent = text;
    wrap.appendChild(div);
    wrap.scrollTop = wrap.scrollHeight;
    return div;
  }
  function aiReply(question){
    const q = question.toLowerCase();
    const knowledge = RiforaData.getAiKnowledge();

    // Check brand/product match first
    const foundBrand = brands.find(b => q.includes(b.name.toLowerCase()));
    if (foundBrand){
      const cheapest = [...foundBrand.packages].sort((a,b)=>a.price-b.price)[0];
      if (cheapest){
        return `${foundBrand.name} tersedia mulai dari ${RiforaData.formatRupiah(cheapest.price)} (${cheapest.name}, garansi ${cheapest.warranty}). Total ada ${foundBrand.packages.length} pilihan paket. Buka tab Produk untuk lihat semua paketnya ya!`;
      }
    }

    if (q.includes('harga') || q.includes('berapa')){
      return 'Harga tiap brand berbeda-beda tergantung paket dan masa aktifnya. Silakan buka tab Produk lalu pilih brand yang kamu mau untuk melihat daftar harga lengkapnya.';
    }
    if (q.includes('order') || q.includes('beli') || q.includes('cara')){
      const k = knowledge.find(k => k.topic.toLowerCase().includes('cara order'));
      return k ? k.content : 'Pilih brand di tab Produk, pilih paket, klik ORDER SEKARANG, lalu pilih admin — kamu akan diarahkan ke WhatsApp untuk konfirmasi.';
    }
    if (q.includes('garansi')){
      const k = knowledge.find(k => k.topic.toLowerCase().includes('garansi'));
      return k ? k.content : 'Setiap paket punya masa garansi berbeda, cek keterangan di halaman detail produk ya.';
    }
    if (q.includes('jam') || q.includes('operasional') || q.includes('buka')){
      const k = knowledge.find(k => k.topic.toLowerCase().includes('jam operasional'));
      return k ? k.content : 'Admin kami melayani setiap hari pukul 08.00 - 23.00 WIB.';
    }
    if (q.includes('produk') || q.includes('brand') || q.includes('apa saja')){
      return `Kami menyediakan ${brands.map(b=>b.name).join(', ')}. Cek tab Produk untuk detail lengkapnya!`;
    }
    if (q.includes('halo') || q.includes('hai') || q.includes('hi')){
      return 'Halo juga! Ada yang bisa saya bantu seputar produk Rifora Premium?';
    }
    return 'Maaf, saya belum menemukan jawaban pastinya. Untuk info lebih lanjut, silakan hubungi admin kami langsung lewat menu Order atau tab Profil > Hubungi Kami.';
  }

  function bindGlobalEvents(){
    document.getElementById('orderBtn').addEventListener('click', openOrderSheet);

    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatWrap = document.getElementById('chatWrap');
    function handleSend(){
      const val = chatInput.value.trim();
      if (!val) return;
      addChatMsg(chatWrap, 'user', val);
      chatInput.value = '';
      const typing = document.createElement('div');
      typing.className = 'chat-msg bot';
      typing.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
      chatWrap.appendChild(typing);
      chatWrap.scrollTop = chatWrap.scrollHeight;
      setTimeout(() => {
        typing.remove();
        addChatMsg(chatWrap, 'bot', aiReply(val));
      }, 700);
    }
    chatSend.addEventListener('click', handleSend);
    chatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSend(); });

    // Profile modals
    document.querySelectorAll('[data-open]').forEach(row => {
      row.addEventListener('click', () => openModal(row.dataset.open));
    });
    document.getElementById('contactUsRow').addEventListener('click', () => {
      const admins = WA_NUMBERS();
      if (admins[0]){
        const phone = admins[0].phone.replace(/^0/, '62').replace(/\D/g,'');
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent('Halo Admin Rifora Premium, saya ingin bertanya.')}`, '_blank');
      }
    });
    document.getElementById('modalOverlay').addEventListener('click', (e) => {
      if (e.target.id === 'modalOverlay') closeModal();
    });

    document.getElementById('saveProfileBtn').addEventListener('click', () => {
      const profile = RiforaData.getProfile();
      profile.name = document.getElementById('profileNameInput').value || profile.name;
      profile.phone = document.getElementById('profilePhoneInput').value;
      profile.address = document.getElementById('profileAddressInput').value;
      RiforaData.setProfile(profile);
      renderProfile();
      closeModal();
      toast('Profil berhasil disimpan');
    });
    document.getElementById('savePasswordBtn').addEventListener('click', () => {
      closeModal();
      toast('Password berhasil diperbarui');
    });

    const photoInput = document.getElementById('profilePhotoInput');
    photoInput.addEventListener('change', () => {
      const file = photoInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const profile = RiforaData.getProfile();
        profile.photo = reader.result;
        RiforaData.setProfile(profile);
        document.getElementById('profileUploadBox').innerHTML =
          `<img src="${reader.result}" alt="Preview"><span>Ketuk untuk ganti foto</span>`;
        renderProfile();
      };
      reader.readAsDataURL(file);
    });
  }

  function openModal(id){
    document.getElementById('modalOverlay').classList.add('show');
    document.querySelectorAll('.admin-modal').forEach(m => m.style.display = 'none');
    const target = document.getElementById(id);
    if (target){
      target.style.display = 'block';
      if (id === 'editProfileModal'){
        const p = RiforaData.getProfile();
        document.getElementById('profileNameInput').value = p.name || '';
        document.getElementById('profilePhoneInput').value = p.phone || '';
        document.getElementById('profileAddressInput').value = p.address || '';
      }
    }
  }
  function closeModal(){ document.getElementById('modalOverlay').classList.remove('show'); }

  /* ---------- Profile render ---------- */
  function renderProfile(){
    const p = RiforaData.getProfile();
    document.getElementById('profileName').textContent = p.name || 'Pengguna Rifora';
    document.getElementById('profilePhone').textContent = p.phone || 'Lengkapi profil Anda';
    const photoEl = document.getElementById('profilePhoto');
    if (p.photo){
      photoEl.innerHTML = `<img src="${p.photo}" style="width:100%;height:100%;object-fit:cover;">`;
    } else {
      photoEl.textContent = (p.name || 'P').charAt(0).toUpperCase();
    }
  }

  /* ---------- Utils ---------- */
  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

  // Redraw banner position on load
  window.addEventListener('load', updateBannerPosition);

})();