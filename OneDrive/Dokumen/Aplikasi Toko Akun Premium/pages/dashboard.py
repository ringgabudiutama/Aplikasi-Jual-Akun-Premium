"""
Dashboard — halaman utama.
Isi: header, search bar, banner promo auto slider (dengan animated mesh gradient
di background), kategori, produk populer, produk terbaru, promo hari ini,
kenapa memilih kami, testimoni, FAQ, CTA AI Assistant, footer.
"""
import asyncio
import flet as ft
from theme.colors import AppColors, AppRadius, AppShadow
from data.store_data import CATEGORIES, PRODUCTS, PROMO_BANNERS, TESTIMONIALS, FAQS, WHY_CHOOSE_US
from components.section_header import section_header
from components.category_icon import category_icon
from components.product_card import product_card
from components.promo_banner import promo_banner_slider
from components.testimonial_card import testimonial_slider
from components.faq_item import faq_item
from components.skeleton import skeleton_row


def _animated_mesh_background() -> ft.Container:
    """Mesh gradient merah-putih yang bergerak perlahan di belakang header."""
    blob = ft.Container(
        width=260, height=260, border_radius=130,
        gradient=ft.RadialGradient(colors=[ft.colors.with_opacity(0.35, AppColors.SECONDARY), ft.colors.TRANSPARENT]),
        left=-60, top=-80,
        animate_position=ft.Animation(3000, ft.AnimationCurve.EASE_IN_OUT),
    )
    blob2 = ft.Container(
        width=200, height=200, border_radius=100,
        gradient=ft.RadialGradient(colors=[ft.colors.with_opacity(0.25, AppColors.PRIMARY), ft.colors.TRANSPARENT]),
        right=-40, top=20,
        animate_position=ft.Animation(3500, ft.AnimationCurve.EASE_IN_OUT),
    )
    stack = ft.Stack(controls=[blob, blob2], height=220)

    async def float_anim():
        toggle = False
        while stack.page:
            await asyncio.sleep(3)
            toggle = not toggle
            blob.left = -20 if toggle else -60
            blob.top = -50 if toggle else -80
            blob2.right = -10 if toggle else -40
            blob2.top = 50 if toggle else 20
            if stack.page:
                blob.update()
                blob2.update()

    stack.did_mount = lambda: stack.page.run_task(float_anim) if stack.page else None
    return ft.Container(content=stack, height=0)  # height 0: hanya dekorasi di belakang header


def build_dashboard(page: ft.Page, state, on_open_product, on_go_products, on_go_ai) -> ft.Container:
    profile_name = state.profile.get("name", "Pengguna").split(" ")[0]

    search_field = ft.TextField(
        hint_text="Cari produk premium...",
        prefix_icon=ft.icons.SEARCH_ROUNDED,
        border_radius=AppRadius.BUTTON,
        border_color=AppColors.BORDER,
        focused_border_color=AppColors.PRIMARY,
        filled=True,
        fill_color=ft.colors.WHITE,
        content_padding=ft.padding.symmetric(horizontal=16, vertical=10),
        height=48,
        on_submit=lambda e: on_go_products(e.control.value),
    )

    header = ft.Container(
        padding=ft.padding.only(left=20, right=20, top=50, bottom=20),
        gradient=ft.LinearGradient(
            begin=ft.alignment.top_center, end=ft.alignment.bottom_center,
            colors=[AppColors.PRIMARY, AppColors.SECONDARY],
        ),
        content=ft.Column(
            spacing=16,
            controls=[
                ft.Row(
                    alignment=ft.MainAxisAlignment.SPACE_BETWEEN,
                    controls=[
                        ft.Column(
                            spacing=2,
                            controls=[
                                ft.Text("Halo,", size=13, color=ft.colors.with_opacity(0.9, ft.colors.WHITE)),
                                ft.Text(f"Selamat Datang, {profile_name}!", size=18, weight=ft.FontWeight.W_700,
                                         color=ft.colors.WHITE),
                            ],
                        ),
                        ft.Container(
                            width=42, height=42, border_radius=21,
                            bgcolor=ft.colors.with_opacity(0.2, ft.colors.WHITE),
                            alignment=ft.alignment.center,
                            content=ft.Icon(ft.icons.NOTIFICATIONS_NONE_ROUNDED, color=ft.colors.WHITE),
                        ),
                    ],
                ),
                search_field,
            ],
        ),
    )

    # ---------- Kategori ----------
    categories_row = ft.Row(
        spacing=14, scroll=ft.ScrollMode.HIDDEN,
        controls=[category_icon(cat, on_tap=lambda cid: on_go_products(None, cid)) for cat in CATEGORIES],
    )

    # ---------- Produk populer & terbaru (skeleton -> real) ----------
    popular_products = sorted(PRODUCTS, key=lambda p: p["sold"], reverse=True)[:6]
    newest_products = [p for p in PRODUCTS if p["is_new"]] or PRODUCTS[-6:]

    popular_container = ft.Container(content=skeleton_row())
    newest_container = ft.Container(content=skeleton_row())

    def render_product_row(products, container: ft.Container):
        container.content = ft.Row(
            spacing=14, scroll=ft.ScrollMode.HIDDEN,
            controls=[
                product_card(
                    p, state.is_favorite(p["id"]),
                    on_tap=on_open_product,
                    on_toggle_favorite=lambda pid: (state.toggle_favorite(pid), render_product_row(products, container)),
                )
                for p in products
            ],
        )
        if container.page:
            container.update()

    async def load_products():
        await asyncio.sleep(0.9)  # simulasi loading -> skeleton terlihat sebentar
        render_product_row(popular_products, popular_container)
        render_product_row(newest_products, newest_container)

    # ---------- Promo hari ini ----------
    promo_today = ft.Container(
        border_radius=AppRadius.CARD,
        padding=18,
        bgcolor=AppColors.SURFACE,
        border=ft.border.all(1, AppColors.ACCENT),
        content=ft.Row(
            alignment=ft.MainAxisAlignment.SPACE_BETWEEN,
            controls=[
                ft.Column(
                    spacing=4,
                    controls=[
                        ft.Text("Flash Sale Hari Ini", size=14, weight=ft.FontWeight.W_700, color=AppColors.TEXT_DARK),
                        ft.Text("Diskon spesial berakhir dalam 05:12:44", size=11, color=AppColors.TEXT_GRAY),
                    ],
                ),
                ft.Icon(ft.icons.TIMER_OUTLINED, color=AppColors.PRIMARY, size=28),
            ],
        ),
    )

    # ---------- Kenapa memilih kami ----------
    why_us_grid = ft.GridView(
        expand=False, height=170, max_extent=200,
        child_aspect_ratio=1.6, spacing=12, run_spacing=12,
        controls=[
            ft.Container(
                border_radius=AppRadius.CARD - 4, bgcolor=ft.colors.WHITE, padding=14,
                shadow=AppShadow.soft(),
                content=ft.Column(
                    spacing=6,
                    controls=[
                        ft.Icon(item["icon"], color=AppColors.PRIMARY, size=24),
                        ft.Text(item["title"], size=12.5, weight=ft.FontWeight.W_700, color=AppColors.TEXT_DARK),
                        ft.Text(item["desc"], size=10.5, color=AppColors.TEXT_GRAY, max_lines=2),
                    ],
                ),
            )
            for item in WHY_CHOOSE_US
        ],
    )

    # ---------- AI Assistant CTA ----------
    ai_cta = ft.Container(
        border_radius=AppRadius.CARD,
        padding=18,
        on_click=lambda e: on_go_ai(),
        gradient=ft.LinearGradient(
            begin=ft.alignment.center_left, end=ft.alignment.center_right,
            colors=["#212121", "#424242"],
        ),
        content=ft.Row(
            alignment=ft.MainAxisAlignment.SPACE_BETWEEN,
            controls=[
                ft.Column(
                    spacing=4,
                    controls=[
                        ft.Text("Butuh bantuan cepat?", size=13, color=ft.colors.with_opacity(0.8, ft.colors.WHITE)),
                        ft.Text("Tanya AI Assistant kami", size=15, weight=ft.FontWeight.W_700, color=ft.colors.WHITE),
                    ],
                ),
                ft.Container(
                    width=44, height=44, border_radius=22, bgcolor=AppColors.PRIMARY,
                    alignment=ft.alignment.center,
                    content=ft.Icon(ft.icons.SMART_TOY_ROUNDED, color=ft.colors.WHITE, size=22),
                ),
            ],
        ),
    )

    # ---------- Footer ----------
    footer = ft.Container(
        padding=ft.padding.symmetric(vertical=24),
        content=ft.Column(
            horizontal_alignment=ft.CrossAxisAlignment.CENTER,
            spacing=4,
            controls=[
                ft.Icon(ft.icons.WORKSPACE_PREMIUM_ROUNDED, color=AppColors.PRIMARY, size=26),
                ft.Text("Rifora Premium", size=13, weight=ft.FontWeight.W_700, color=AppColors.TEXT_DARK),
                ft.Text("© 2026 Rifora Premium. All rights reserved.", size=10, color=AppColors.TEXT_LIGHT_GRAY),
            ],
        ),
    )

    body = ft.Column(
        spacing=26,
        scroll=ft.ScrollMode.AUTO,
        expand=True,
        controls=[
            header,
            ft.Container(
                padding=ft.padding.symmetric(horizontal=20),
                content=ft.Column(
                    spacing=26,
                    controls=[
                        ft.Column(spacing=12, controls=[section_header("Kategori"), categories_row]),
                        ft.Column(spacing=12, controls=[
                            section_header("Produk Populer", on_view_all=lambda e: on_go_products(None)),
                            popular_container,
                        ]),
                        ft.Column(spacing=12, controls=[
                            section_header("Produk Terbaru", on_view_all=lambda e: on_go_products(None)),
                            newest_container,
                        ]),
                        ft.Column(spacing=12, controls=[section_header("Promo Hari Ini"), promo_today]),
                        ft.Column(spacing=12, controls=[section_header("Kenapa Memilih Rifora Premium"), why_us_grid]),
                        ft.Column(spacing=12, controls=[section_header("Testimoni"), testimonial_slider(TESTIMONIALS)]),
                        ft.Column(spacing=12, controls=[
                            section_header("FAQ"),
                            ft.Column(spacing=10, controls=[faq_item(f["q"], f["a"]) for f in FAQS]),
                        ]),
                        ai_cta,
                        footer,
                    ],
                ),
            ),
        ],
    )

    # sisipkan banner promo tepat di bawah header (dalam padding horizontal)
    banner_wrapper = ft.Container(
        padding=ft.padding.symmetric(horizontal=20),
        margin=ft.margin.only(top=-30),
        content=promo_banner_slider(PROMO_BANNERS),
    )
    body.controls.insert(1, banner_wrapper)

    root = ft.Container(expand=True, bgcolor=AppColors.BACKGROUND, content=body)
    root.did_mount = lambda: root.page.run_task(load_products) if root.page else None
    return root
