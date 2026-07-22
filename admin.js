/* =========================================================
   RIFORA PREMIUM — admin.js (admin.html)
   ========================================================= */

(function(){
  'use strict';

  let brands = [];
  let editingBrandId = null;
  let editingPackageBrandId = null;
  let editingBannerId = null;
  let editingPromoId = null;
  let editingFaqId = null;
  let editingAiId = null;
  let pendingDelete = null; // {type, id}
  let tempLogo = '';

  const titles = {
    dashboard: ['Dashboard', 'Ringkasan toko Rifora Premium'],
    brand: ['Brand', 'Kelola brand & paket produk'],
    banner: ['Banner', 'Kelola banner promosi dashboard'],
    promo: ['Promo', 'Kelola promo aktif'],
    faq: ['FAQ', 'Kelola pertanyaan yang sering diajukan'],
    ai: ['AI Knowledge', 'Kelola basis pengetahuan AI Assistant'],
    settings: ['Pengaturan', 'Kelola nomor admin & identitas toko'],
  };

  document.addEventListener('DOMContentLoaded', () => {
    brands = RiforaData.getBrands();
    bindSidebar();
    bindModals();
    renderDashboard();
    renderBrandTable();
    renderBannerTable();
    renderPromoTable();
    renderFaqTable();
    renderAiTable();
    renderSettings();
    if (window.lucide) lucide.createIcons();
  });

  function toast(msg){
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
  }

  /* ---------- Sidebar navigation ---------- */
  function bindSidebar(){
    document.querySelectorAll('.admin-menu a').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const view = a.dataset.view;
        document.querySelectorAll('.admin-menu a').forEach(x => x.classList.remove('active'));
        a.classList.add('active');
        document.querySelectorAll('.admin-view').forEach(v => v.style.display = 'none');
        document.getElementById('admin-' + view).style.display = 'block';
        document.getElementById('pageTitle').textContent = titles[view][0];
        document.getElementById('pageSubtitle').textContent = titles[view][1];
        document.getElementById('adminSidebar').classList.remove('open');
      });
    });
    document.getElementById('sidebarToggle').addEventListener('click', () => {
      document.getElementById('adminSidebar').classList.toggle('open');
    });
  }

  /* ---------- Dashboard ---------- */
  function renderDashboard(){
    const totalPkgs = brands.reduce((s,b) => s + b.packages.length, 0);
    const activeBrands = brands.filter(b => b.status === 'aktif').length;
    document.getElementById('statGrid').innerHTML = `
      <div class="stat-card"><div class="n">${brands.length}</div><div class="l">Total Brand</div></div>
      <div class="stat-card"><div class="n">${totalPkgs}</div><div class="l">Total Paket</div></div>
      <div class="stat-card"><div class="n">${activeBrands}</div><div class="l">Brand Aktif</div></div>
      <div class="stat-card"><div class="n">${RiforaData.getFaqs().length}</div><div class="l">FAQ Tersedia</div></div>
    `;
    document.getElementById('dashboardBrandTable').innerHTML = brands.map(b => `
      <tr>
        <td style="font-weight:600;">${escapeHtml(b.name)}</td>
        <td>${escapeHtml(b.category)}</td>
        <td>${b.packages.length} paket</td>
        <td><span class="status-dot ${b.status!=='aktif'?'off':''}">${b.status==='aktif'?'Aktif':'Nonaktif'}</span></td>
      </tr>
    `).join('') || `<tr><td colspan="4" style="text-align:center; color:var(--muted);">Belum ada brand</td></tr>`;
  }

  /* ---------- Brand table ---------- */
  function renderBrandTable(){
    const wrap = document.getElementById('brandTable');
    wrap.innerHTML = brands.map(b => `
      <tr>
        <td><img class="row-logo" src="${b.logo}" alt=""></td>
        <td style="font-weight:600;">${escapeHtml(b.name)}</td>
        <td>${escapeHtml(b.category)}</td>
        <td>${b.badge ? `<span class="badge-pill">${escapeHtml(b.badge)}</span>` : '-'}</td>
        <td>${b.packages.length} paket <button class="icon-btn" data-manage-pkg="${b.id}" title="Kelola Paket"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg></button></td>
        <td><span class="status-dot ${b.status!=='aktif'?'off':''}">${b.status==='aktif'?'Aktif':'Nonaktif'}</span></td>
        <td>
          <button class="icon-btn" data-edit-brand="${b.id}" title="Edit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z"/></svg></button>
          <button class="icon-btn danger" data-del-brand="${b.id}" title="Hapus"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
        </td>
      </tr>
    `).join('') || `<tr><td colspan="7" style="text-align:center; color:var(--muted); padding:24px;">Belum ada brand. Klik "Tambah Brand" untuk memulai.</td></tr>`;

    wrap.querySelectorAll('[data-edit-brand]').forEach(b => b.addEventListener('click', () => openBrandModal(b.dataset.editBrand)));
    wrap.querySelectorAll('[data-del-brand]').forEach(b => b.addEventListener('click', () => confirmDelete('brand', b.dataset.delBrand)));
    wrap.querySelectorAll('[data-manage-pkg]').forEach(b => b.addEventListener('click', () => openPackageModal(b.dataset.managePkg)));
  }

  /* ---------- Brand modal ---------- */
  function openBrandModal(id){
    editingBrandId = id || null;
    tempLogo = '';
    const brand = id ? brands.find(b => b.id === id) : null;
    document.getElementById('brandModalTitle').textContent = brand ? 'Edit Brand' : 'Tambah Brand';
    document.getElementById('brandIconInput').value = brand ? brand.icon || '' : '';
    document.getElementById('brandNameInput').value = brand ? brand.name : '';
    document.getElementById('brandCategoryInput').value = brand ? brand.category : '';
    document.getElementById('brandDescInput').value = brand ? brand.description : '';
    document.getElementById('brandBadgeInput').value = brand ? (brand.badge || '') : '';
    document.getElementById('brandStatusInput').value = brand ? brand.status : 'aktif';
    const box = document.getElementById('brandUploadBox');
    if (brand && brand.logo){
      box.innerHTML = `<img src="${brand.logo}" alt="Preview"><span>Ketuk untuk ganti logo</span><input type="file" accept="image/*" id="brandLogoInput">`;
    } else {
      box.innerHTML = `<span>Ketuk untuk unggah logo (PNG/SVG/JPG)</span><input type="file" accept="image/*" id="brandLogoInput">`;
    }
    bindLogoInput();
    openModal('brandModal');
  }

  function bindLogoInput(){
    const input = document.getElementById('brandLogoInput');
    input.addEventListener('change', () => {
      const file = input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        tempLogo = reader.result;
        document.getElementById('brandUploadBox').innerHTML =
          `<img src="${reader.result}" alt="Preview"><span>Ketuk untuk ganti logo</span><input type="file" accept="image/*" id="brandLogoInput">`;
        bindLogoInput();
      };
      reader.readAsDataURL(file);
    });
  }

  document.getElementById('saveBrandBtn') && document.getElementById('saveBrandBtn').addEventListener('click', () => {
    const name = document.getElementById('brandNameInput').value.trim();
    const category = document.getElementById('brandCategoryInput').value.trim();
    if (!name || !category){ toast('Nama dan kategori wajib diisi'); return; }

    const existing = editingBrandId ? brands.find(b => b.id === editingBrandId) : null;
    const icon = document.getElementById('brandIconInput').value.trim() || (existing ? existing.icon : '🛍');
    const logo = tempLogo || (existing ? existing.logo : riforaPlaceholderLogo(name.charAt(0).toUpperCase(), '#E53935', '#FF4D4F'));

    const data = {
      name, category, icon, logo,
      description: document.getElementById('brandDescInput').value.trim(),
      badge: document.getElementById('brandBadgeInput').value,
      status: document.getElementById('brandStatusInput').value,
    };

    if (existing){
      Object.assign(existing, data);
      toast('Brand berhasil diperbarui');
    } else {
      brands.push({ id: RiforaData.uid('b'), packages: [], ...data });
      toast('Brand berhasil ditambahkan');
    }
    RiforaData.setBrands(brands);
    renderBrandTable(); renderDashboard();
    closeModal();
  });

  /* ---------- Package modal ---------- */
  function openPackageModal(brandId){
    editingPackageBrandId = brandId;
    const brand = brands.find(b => b.id === brandId);
    document.getElementById('packageModalTitle').textContent = `Kelola Paket — ${brand.name}`;
    renderPackageExisting();
    document.getElementById('pkgNameInput').value = '';
    document.getElementById('pkgPriceInput').value = '';
    document.getElementById('pkgWarrantyInput').value = '';
    document.getElementById('pkgNoteInput').value = '';
    openModal('packageModal');
  }
  function renderPackageExisting(){
    const brand = brands.find(b => b.id === editingPackageBrandId);
    const wrap = document.getElementById('packageExistingList');
    if (!brand.packages.length){
      wrap.innerHTML = `<p style="font-size:12px; color:var(--muted);">Belum ada paket.</p>`;
      return;
    }
    wrap.innerHTML = brand.packages.map(p => `
      <div class="pkg-mini-row">
        <div class="info"><b>${escapeHtml(p.name)}</b><span>${RiforaData.formatRupiah(p.price)} • Garansi ${escapeHtml(p.warranty||'-')}</span></div>
        <button class="icon-btn danger" data-del-pkg="${p.id}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
      </div>
    `).join('');
    wrap.querySelectorAll('[data-del-pkg]').forEach(btn => {
      btn.addEventListener('click', () => {
        brand.packages = brand.packages.filter(p => p.id !== btn.dataset.delPkg);
        RiforaData.setBrands(brands);
        renderPackageExisting();
        renderBrandTable(); renderDashboard();
        toast('Paket dihapus');
      });
    });
  }
  document.getElementById('addPkgBtn') && document.getElementById('addPkgBtn').addEventListener('click', () => {
    const name = document.getElementById('pkgNameInput').value.trim();
    const price = Number(document.getElementById('pkgPriceInput').value);
    if (!name || !price){ toast('Nama dan harga paket wajib diisi'); return; }
    const brand = brands.find(b => b.id === editingPackageBrandId);
    brand.packages.push({
      id: RiforaData.uid('p'), name, price,
      warranty: document.getElementById('pkgWarrantyInput').value.trim(),
      note: document.getElementById('pkgNoteInput').value.trim(),
    });
    RiforaData.setBrands(brands);
    document.getElementById('pkgNameInput').value = '';
    document.getElementById('pkgPriceInput').value = '';
    document.getElementById('pkgWarrantyInput').value = '';
    document.getElementById('pkgNoteInput').value = '';
    renderPackageExisting();
    renderBrandTable(); renderDashboard();
    toast('Paket berhasil ditambahkan');
  });
  document.getElementById('closePackageModalBtn') && document.getElementById('closePackageModalBtn').addEventListener('click', closeModal);

  /* ---------- Banner CRUD ---------- */
  function renderBannerTable(){
    const banners = RiforaData.getBanners();
    document.getElementById('bannerTable').innerHTML = banners.map(b => `
      <tr>
        <td style="font-weight:600;">${escapeHtml(b.title)}</td>
        <td>${escapeHtml(b.subtitle)}</td>
        <td><span class="badge-pill">${b.color==='a'?'Merah Terang':b.color==='b'?'Merah Gelap':'Merah Muda'}</span></td>
        <td>
          <button class="icon-btn" data-edit-banner="${b.id}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z"/></svg></button>
          <button class="icon-btn danger" data-del-banner="${b.id}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
        </td>
      </tr>
    `).join('') || `<tr><td colspan="4" style="text-align:center; color:var(--muted); padding:24px;">Belum ada banner</td></tr>`;
    document.getElementById('bannerTable').querySelectorAll('[data-edit-banner]').forEach(b => b.addEventListener('click', () => openBannerModal(b.dataset.editBanner)));
    document.getElementById('bannerTable').querySelectorAll('[data-del-banner]').forEach(b => b.addEventListener('click', () => confirmDelete('banner', b.dataset.delBanner)));
  }
  function openBannerModal(id){
    editingBannerId = id || null;
    const banners = RiforaData.getBanners();
    const item = id ? banners.find(b => b.id === id) : null;
    document.getElementById('bannerModalTitle').textContent = item ? 'Edit Banner' : 'Tambah Banner';
    document.getElementById('bannerTitleInput').value = item ? item.title : '';
    document.getElementById('bannerSubtitleInput').value = item ? item.subtitle : '';
    document.getElementById('bannerColorInput').value = item ? item.color : 'a';
    openModal('bannerModal');
  }
  document.getElementById('addBannerBtn') && document.getElementById('addBannerBtn').addEventListener('click', () => openBannerModal(null));
  document.getElementById('saveBannerBtn') && document.getElementById('saveBannerBtn').addEventListener('click', () => {
    const title = document.getElementById('bannerTitleInput').value.trim();
    if (!title){ toast('Judul wajib diisi'); return; }
    let banners = RiforaData.getBanners();
    const data = {
      title, subtitle: document.getElementById('bannerSubtitleInput').value.trim(),
      color: document.getElementById('bannerColorInput').value,
    };
    if (editingBannerId){
      banners = banners.map(b => b.id === editingBannerId ? { ...b, ...data } : b);
    } else {
      banners.push({ id: RiforaData.uid('bn'), ...data });
    }
    RiforaData.setBanners(banners);
    renderBannerTable();
    closeModal();
    toast('Banner berhasil disimpan');
  });

  /* ---------- Promo CRUD ---------- */
  function renderPromoTable(){
    const promos = RiforaData.getPromos();
    document.getElementById('promoTable').innerHTML = promos.map(p => `
      <tr>
        <td style="font-weight:600;">${escapeHtml(p.title)}</td>
        <td>${escapeHtml(p.desc)}</td>
        <td><span class="status-dot ${!p.active?'off':''}">${p.active?'Aktif':'Nonaktif'}</span></td>
        <td>
          <button class="icon-btn" data-edit-promo="${p.id}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z"/></svg></button>
          <button class="icon-btn danger" data-del-promo="${p.id}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
        </td>
      </tr>
    `).join('') || `<tr><td colspan="4" style="text-align:center; color:var(--muted); padding:24px;">Belum ada promo</td></tr>`;
    document.getElementById('promoTable').querySelectorAll('[data-edit-promo]').forEach(b => b.addEventListener('click', () => openPromoModal(b.dataset.editPromo)));
    document.getElementById('promoTable').querySelectorAll('[data-del-promo]').forEach(b => b.addEventListener('click', () => confirmDelete('promo', b.dataset.delPromo)));
  }
  function openPromoModal(id){
    editingPromoId = id || null;
    const promos = RiforaData.getPromos();
    const item = id ? promos.find(p => p.id === id) : null;
    document.getElementById('promoModalTitle').textContent = item ? 'Edit Promo' : 'Tambah Promo';
    document.getElementById('promoTitleInput').value = item ? item.title : '';
    document.getElementById('promoDescInput').value = item ? item.desc : '';
    document.getElementById('promoActiveInput').value = item ? String(item.active) : 'true';
    openModal('promoModal');
  }
  document.getElementById('addPromoBtn') && document.getElementById('addPromoBtn').addEventListener('click', () => openPromoModal(null));
  document.getElementById('savePromoBtn') && document.getElementById('savePromoBtn').addEventListener('click', () => {
    const title = document.getElementById('promoTitleInput').value.trim();
    if (!title){ toast('Judul wajib diisi'); return; }
    let promos = RiforaData.getPromos();
    const data = {
      title, desc: document.getElementById('promoDescInput').value.trim(),
      active: document.getElementById('promoActiveInput').value === 'true',
    };
    if (editingPromoId){
      promos = promos.map(p => p.id === editingPromoId ? { ...p, ...data } : p);
    } else {
      promos.push({ id: RiforaData.uid('pr'), ...data });
    }
    RiforaData.setPromos(promos);
    renderPromoTable();
    closeModal();
    toast('Promo berhasil disimpan');
  });

  /* ---------- FAQ CRUD ---------- */
  function renderFaqTable(){
    const faqs = RiforaData.getFaqs();
    document.getElementById('faqTable').innerHTML = faqs.map(f => `
      <tr>
        <td style="font-weight:600; max-width:220px;">${escapeHtml(f.q)}</td>
        <td style="max-width:320px;">${escapeHtml(f.a)}</td>
        <td>
          <button class="icon-btn" data-edit-faq="${f.id}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z"/></svg></button>
          <button class="icon-btn danger" data-del-faq="${f.id}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
        </td>
      </tr>
    `).join('') || `<tr><td colspan="3" style="text-align:center; color:var(--muted); padding:24px;">Belum ada FAQ</td></tr>`;
    document.getElementById('faqTable').querySelectorAll('[data-edit-faq]').forEach(b => b.addEventListener('click', () => openFaqModal(b.dataset.editFaq)));
    document.getElementById('faqTable').querySelectorAll('[data-del-faq]').forEach(b => b.addEventListener('click', () => confirmDelete('faq', b.dataset.delFaq)));
  }
  function openFaqModal(id){
    editingFaqId = id || null;
    const faqs = RiforaData.getFaqs();
    const item = id ? faqs.find(f => f.id === id) : null;
    document.getElementById('faqModalTitle').textContent = item ? 'Edit FAQ' : 'Tambah FAQ';
    document.getElementById('faqQInput').value = item ? item.q : '';
    document.getElementById('faqAInput').value = item ? item.a : '';
    openModal('faqModal');
  }
  document.getElementById('addFaqBtn') && document.getElementById('addFaqBtn').addEventListener('click', () => openFaqModal(null));
  document.getElementById('saveFaqBtn') && document.getElementById('saveFaqBtn').addEventListener('click', () => {
    const q = document.getElementById('faqQInput').value.trim();
    const a = document.getElementById('faqAInput').value.trim();
    if (!q || !a){ toast('Pertanyaan dan jawaban wajib diisi'); return; }
    let faqs = RiforaData.getFaqs();
    if (editingFaqId){
      faqs = faqs.map(f => f.id === editingFaqId ? { ...f, q, a } : f);
    } else {
      faqs.push({ id: RiforaData.uid('f'), q, a });
    }
    RiforaData.setFaqs(faqs);
    renderFaqTable();
    renderDashboard();
    closeModal();
    toast('FAQ berhasil disimpan');
  });

  /* ---------- AI Knowledge CRUD ---------- */
  function renderAiTable(){
    const items = RiforaData.getAiKnowledge();
    document.getElementById('aiTable').innerHTML = items.map(k => `
      <tr>
        <td style="font-weight:600;">${escapeHtml(k.topic)}</td>
        <td style="max-width:320px;">${escapeHtml(k.content)}</td>
        <td>
          <button class="icon-btn" data-edit-ai="${k.id}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z"/></svg></button>
          <button class="icon-btn danger" data-del-ai="${k.id}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
        </td>
      </tr>
    `).join('') || `<tr><td colspan="3" style="text-align:center; color:var(--muted); padding:24px;">Belum ada pengetahuan AI</td></tr>`;
    document.getElementById('aiTable').querySelectorAll('[data-edit-ai]').forEach(b => b.addEventListener('click', () => openAiModal(b.dataset.editAi)));
    document.getElementById('aiTable').querySelectorAll('[data-del-ai]').forEach(b => b.addEventListener('click', () => confirmDelete('ai', b.dataset.delAi)));
  }
  function openAiModal(id){
    editingAiId = id || null;
    const items = RiforaData.getAiKnowledge();
    const item = id ? items.find(k => k.id === id) : null;
    document.getElementById('aiModalTitle').textContent = item ? 'Edit Pengetahuan AI' : 'Tambah Pengetahuan AI';
    document.getElementById('aiTopicInput').value = item ? item.topic : '';
    document.getElementById('aiContentInput').value = item ? item.content : '';
    openModal('aiModal');
  }
  document.getElementById('addAiBtn') && document.getElementById('addAiBtn').addEventListener('click', () => openAiModal(null));
  document.getElementById('saveAiBtn') && document.getElementById('saveAiBtn').addEventListener('click', () => {
    const topic = document.getElementById('aiTopicInput').value.trim();
    const content = document.getElementById('aiContentInput').value.trim();
    if (!topic || !content){ toast('Topik dan konten wajib diisi'); return; }
    let items = RiforaData.getAiKnowledge();
    if (editingAiId){
      items = items.map(k => k.id === editingAiId ? { ...k, topic, content } : k);
    } else {
      items.push({ id: RiforaData.uid('k'), topic, content });
    }
    RiforaData.setAiKnowledge(items);
    renderAiTable();
    closeModal();
    toast('Pengetahuan AI berhasil disimpan');
  });

  /* ---------- Settings ---------- */
  function renderSettings(){
    const s = RiforaData.getSettings();
    document.getElementById('settingsStoreName').value = s.storeName || '';
    document.getElementById('settingsTagline').value = s.tagline || '';
    renderAdminNumberList(s.admins || []);
  }
  function renderAdminNumberList(admins){
    const wrap = document.getElementById('settingsAdminList');
    wrap.innerHTML = admins.map((a, i) => `
      <div style="display:flex; gap:10px; margin-bottom:10px;" data-admin-row="${i}">
        <input type="text" value="${escapeHtml(a.name)}" placeholder="Nama Admin" data-admin-name style="flex:1;">
        <input type="text" value="${escapeHtml(a.phone)}" placeholder="08xxxxxxxxxx" data-admin-phone style="flex:1;">
        <button class="icon-btn danger" data-remove-admin="${i}"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
      </div>
    `).join('');
    wrap.querySelectorAll('[data-remove-admin]').forEach(btn => {
      btn.addEventListener('click', () => {
        const s = RiforaData.getSettings();
        s.admins.splice(+btn.dataset.removeAdmin, 1);
        RiforaData.setSettings(s);
        renderAdminNumberList(s.admins);
      });
    });
  }
  document.getElementById('addAdminNumberBtn') && document.getElementById('addAdminNumberBtn').addEventListener('click', () => {
    const s = RiforaData.getSettings();
    s.admins.push({ name: 'Admin Baru', phone: '' });
    RiforaData.setSettings(s);
    renderAdminNumberList(s.admins);
  });
  document.getElementById('saveSettingsBtn') && document.getElementById('saveSettingsBtn').addEventListener('click', () => {
    const s = RiforaData.getSettings();
    s.storeName = document.getElementById('settingsStoreName').value.trim();
    s.tagline = document.getElementById('settingsTagline').value.trim();
    const names = document.querySelectorAll('[data-admin-name]');
    const phones = document.querySelectorAll('[data-admin-phone]');
    s.admins = Array.from(names).map((n, i) => ({ name: n.value.trim(), phone: phones[i].value.trim() })).filter(a => a.phone);
    RiforaData.setSettings(s);
    toast('Pengaturan berhasil disimpan');
  });

  /* ---------- Delete confirmation ---------- */
  function confirmDelete(type, id){
    pendingDelete = { type, id };
    openModal('confirmModal');
  }
  document.getElementById('cancelDeleteBtn') && document.getElementById('cancelDeleteBtn').addEventListener('click', () => { pendingDelete = null; closeModal(); });
  document.getElementById('confirmDeleteBtn') && document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
    if (!pendingDelete) return closeModal();
    const { type, id } = pendingDelete;
    if (type === 'brand'){
      brands = brands.filter(b => b.id !== id);
      RiforaData.setBrands(brands);
      renderBrandTable(); renderDashboard();
    } else if (type === 'banner'){
      RiforaData.setBanners(RiforaData.getBanners().filter(b => b.id !== id));
      renderBannerTable();
    } else if (type === 'promo'){
      RiforaData.setPromos(RiforaData.getPromos().filter(p => p.id !== id));
      renderPromoTable();
    } else if (type === 'faq'){
      RiforaData.setFaqs(RiforaData.getFaqs().filter(f => f.id !== id));
      renderFaqTable(); renderDashboard();
    } else if (type === 'ai'){
      RiforaData.setAiKnowledge(RiforaData.getAiKnowledge().filter(k => k.id !== id));
      renderAiTable();
    }
    toast('Data berhasil dihapus');
    pendingDelete = null;
    closeModal();
  });

  /* ---------- Modal helpers ---------- */
  function bindModals(){
    document.getElementById('addBrandBtn').addEventListener('click', () => openBrandModal(null));
    document.getElementById('adminModalOverlay').addEventListener('click', (e) => {
      if (e.target.id === 'adminModalOverlay') closeModal();
    });
  }
  function openModal(id){
    document.getElementById('adminModalOverlay').classList.add('show');
    document.querySelectorAll('.admin-modal').forEach(m => m.style.display = 'none');
    document.getElementById(id).style.display = 'block';
  }
  function closeModal(){
    document.getElementById('adminModalOverlay').classList.remove('show');
  }

  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

})();