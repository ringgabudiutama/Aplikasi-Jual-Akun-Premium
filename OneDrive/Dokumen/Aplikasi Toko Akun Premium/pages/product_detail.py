"""
Detail Produk — galeri foto swipe, deskripsi, yang didapat, garansi, syarat,
cara aktivasi, pilihan paket, jumlah, total otomatis, dan alur order:
tombol ORDER SEKARANG -> Bottom Sheet "Pilih Admin" -> buka WhatsApp (wa.me)
dengan pesan otomatis. TIDAK ada checkout/keranjang/payment gateway.
"""
import flet as ft
from theme.colors import AppColors, AppRadius, AppShadow
from data.store_data import ADMINS
from services.whatsapp import format_rupiah, build_order_message, build_wa_link


def build_product_detail(page: ft.Page, state, product: dict, on_back) -> ft.Container:
    selected_package = {"value": product["packages"][0]}
    quantity = {"value": 1}
    photo_index = {"value": 0}

    # ---------------- Galeri foto (swipe) ----------------
    photo_count = 3  # placeholder: 3 "foto" bergaya sama, swipe berganti sedikit shade
    gallery_view = ft.Container(
        height=260, border_radius=AppRadius.CARD,
        gradient=ft.LinearGradient(
            begin=ft.alignment.top_left, end=ft.alignment.bottom_right,
            colors=[AppColors.ACCENT, ft.colors.WHITE],
        ),
        alignment=ft.alignment.center,
        content=ft.Icon(product["icon"], size=90, color=AppColors.PRIMARY),
    )
    dots_row = ft.Row(
        alignment=ft.MainAxisAlignment.CENTER, spacing=6,
        controls=[
            ft.Container(width=6, height=6, border_radius=3,
                         bgcolor=AppColors.PRIMARY if i == 0 else AppColors.BORDER)
            for i in range(photo_count)
        ],
    )

    def swipe_photo(delta):
        photo_index["value"] = (photo_index["value"] + delta) % photo_count
        for i, dot in enumerate(dots_row.controls):
            dot.bgcolor = AppColors.PRIMARY if i == photo_index["value"] else AppColors.BORDER
        dots_row.update()

    gallery_stack = ft.GestureDetector(
        on_horizontal_drag_end=lambda e: swipe_photo(1),
        content=ft.Stack(
            controls=[
                gallery_view,
                ft.Container(
                    left=8, top=110,
                    on_click=lambda e: swipe_photo(-1),
                    content=ft.CircleAvatar(bgcolor=ft.colors.with_opacity(0.5, "#000000"),
                                              content=ft.Icon(ft.icons.CHEVRON_LEFT_ROUNDED, color=ft.colors.WHITE)),
                ),
                ft.Container(
                    right=8, top=110,
                    on_click=lambda e: swipe_photo(1),
                    content=ft.CircleAvatar(bgcolor=ft.colors.with_opacity(0.5, "#000000"),
                                              content=ft.Icon(ft.icons.CHEVRON_RIGHT_ROUNDED, color=ft.colors.WHITE)),
                ),
            ]
        ),
    )

    # ---------------- Info produk ----------------
    title_row = ft.Row(
        alignment=ft.MainAxisAlignment.SPACE_BETWEEN,
        controls=[
            ft.Text(product["name"], size=20, weight=ft.FontWeight.W_800, color=AppColors.TEXT_DARK, expand=True),
            ft.Row(spacing=3, controls=[
                ft.Icon(ft.icons.STAR_ROUNDED, size=16, color=AppColors.STAR),
                ft.Text(str(product["rating"]), size=13, color=AppColors.TEXT_GRAY),
            ]),
        ],
    )

    price_text = ft.Text(f"Mulai {format_rupiah(product['price_from'])}", size=18,
                           weight=ft.FontWeight.W_700, color=AppColors.PRIMARY)

    def info_section(title, body_controls):
        return ft.Column(
            spacing=8,
            controls=[ft.Text(title, size=14, weight=ft.FontWeight.W_700, color=AppColors.TEXT_DARK)] + body_controls,
        )

    def bullet_list(items):
        return ft.Column(spacing=6, controls=[
            ft.Row(spacing=8, controls=[
                ft.Icon(ft.icons.CHECK_CIRCLE_ROUNDED, size=15, color=AppColors.SUCCESS),
                ft.Text(item, size=12.5, color=AppColors.TEXT_GRAY, expand=True),
            ]) for item in items
        ])

    description_section = info_section("Deskripsi", [ft.Text(product["description"], size=12.5, color=AppColors.TEXT_GRAY)])
    includes_section = info_section("Yang Didapat", [bullet_list(product["includes"])])
    warranty_section = info_section("Garansi", [ft.Text(product["warranty"], size=12.5, color=AppColors.TEXT_GRAY)])
    terms_section = info_section("Syarat", [bullet_list(product["terms"])])
    activation_section = info_section("Cara Aktivasi", [ft.Text(product["activation"], size=12.5, color=AppColors.TEXT_GRAY)])

    # ---------------- Pilihan paket ----------------
    total_text = ft.Text(format_rupiah(product["packages"][0]["price"]), size=17, weight=ft.FontWeight.W_800, color=AppColors.PRIMARY)
    qty_text = ft.Text("1", size=14, weight=ft.FontWeight.W_700, color=AppColors.TEXT_DARK)

    def recalc_total():
        total = selected_package["value"]["price"] * quantity["value"]
        total_text.value = format_rupiah(total)
        total_text.update()

    def select_package(pkg, radio_group: ft.RadioGroup):
        selected_package["value"] = pkg
        recalc_total()

    package_radio = ft.RadioGroup(
        content=ft.Column(spacing=8, controls=[
            ft.Container(
                border_radius=14, border=ft.border.all(1, AppColors.BORDER), padding=12,
                content=ft.Row(
                    controls=[
                        ft.Radio(value=pkg["name"]),
                        ft.Column(spacing=0, expand=True, controls=[
                            ft.Text(pkg["name"], size=13, weight=ft.FontWeight.W_600, color=AppColors.TEXT_DARK),
                        ]),
                        ft.Text(format_rupiah(pkg["price"]), size=13, weight=ft.FontWeight.W_700, color=AppColors.PRIMARY),
                    ],
                ),
            )
            for pkg in product["packages"]
        ]),
        value=product["packages"][0]["name"],
    )

    def on_package_change(e):
        pkg = next(p for p in product["packages"] if p["name"] == e.control.value)
        selected_package["value"] = pkg
        recalc_total()

    package_radio.on_change = on_package_change

    def change_qty(delta):
        quantity["value"] = max(1, quantity["value"] + delta)
        qty_text.value = str(quantity["value"])
        qty_text.update()
        recalc_total()

    qty_stepper = ft.Row(
        alignment=ft.MainAxisAlignment.SPACE_BETWEEN,
        controls=[
            ft.Text("Jumlah", size=13, weight=ft.FontWeight.W_600, color=AppColors.TEXT_DARK),
            ft.Row(spacing=14, controls=[
                ft.IconButton(icon=ft.icons.REMOVE_CIRCLE_OUTLINE_ROUNDED, icon_color=AppColors.PRIMARY,
                               on_click=lambda e: change_qty(-1)),
                qty_text,
                ft.IconButton(icon=ft.icons.ADD_CIRCLE_OUTLINE_ROUNDED, icon_color=AppColors.PRIMARY,
                               on_click=lambda e: change_qty(1)),
            ]),
        ],
    )

    # ---------------- Bottom sheet: Pilih Admin ----------------
    def open_admin_sheet(e):
        def choose_admin(admin):
            message = build_order_message(
                product_name=product["name"],
                package_name=selected_package["value"]["name"],
                qty=quantity["value"],
                total=selected_package["value"]["price"] * quantity["value"],
            )
            link = build_wa_link(admin["phone"], message)
            page.launch_url(link)
            page.close(sheet)

        sheet = ft.BottomSheet(
            enable_drag=True,
            content=ft.Container(
                padding=24,
                content=ft.Column(
                    tight=True, spacing=16,
                    controls=[
                        ft.Container(width=40, height=4, border_radius=2, bgcolor=AppColors.BORDER,
                                     alignment=ft.alignment.center),
                        ft.Text("Pilih Admin", size=16, weight=ft.FontWeight.W_700, color=AppColors.TEXT_DARK),
                        ft.Text("Kamu akan diarahkan ke WhatsApp admin yang dipilih.", size=12, color=AppColors.TEXT_GRAY),
                        *[
                            ft.Container(
                                border_radius=16, border=ft.border.all(1, AppColors.BORDER), padding=14,
                                on_click=lambda e, a=admin: choose_admin(a),
                                content=ft.Row(controls=[
                                    ft.CircleAvatar(bgcolor=AppColors.SUCCESS,
                                                      content=ft.Icon(ft.icons.CHAT_ROUNDED, color=ft.colors.WHITE, size=18)),
                                    ft.Column(spacing=0, expand=True, controls=[
                                        ft.Text(admin["name"], size=13, weight=ft.FontWeight.W_600, color=AppColors.TEXT_DARK),
                                        ft.Text(admin["phone"], size=11.5, color=AppColors.TEXT_GRAY),
                                    ]),
                                    ft.Icon(ft.icons.CHEVRON_RIGHT_ROUNDED, color=AppColors.TEXT_LIGHT_GRAY),
                                ]),
                            )
                            for admin in ADMINS
                        ],
                    ],
                ),
            ),
        )
        page.open(sheet)

    order_button = ft.Container(
        border_radius=AppRadius.BUTTON,
        bgcolor=AppColors.PRIMARY,
        padding=ft.padding.symmetric(vertical=16),
        alignment=ft.alignment.center,
        on_click=open_admin_sheet,
        shadow=AppShadow.elevated(),
        content=ft.Text("ORDER SEKARANG", size=15, weight=ft.FontWeight.W_800, color=ft.colors.WHITE),
    )

    # ---------------- App bar sederhana ----------------
    top_bar = ft.Row(
        controls=[
            ft.IconButton(icon=ft.icons.ARROW_BACK_ROUNDED, on_click=lambda e: on_back(), icon_color=AppColors.TEXT_DARK),
            ft.Text("Detail Produk", size=15, weight=ft.FontWeight.W_700, color=AppColors.TEXT_DARK),
        ],
    )

    body = ft.Column(
        expand=True, scroll=ft.ScrollMode.AUTO, spacing=20,
        controls=[
            ft.Container(padding=ft.padding.only(left=8, right=20, top=45), content=top_bar),
            ft.Container(padding=ft.padding.symmetric(horizontal=20), content=ft.Column(spacing=8, controls=[gallery_stack, dots_row])),
            ft.Container(
                padding=ft.padding.symmetric(horizontal=20),
                content=ft.Column(
                    spacing=20,
                    controls=[
                        ft.Column(spacing=6, controls=[title_row, price_text]),
                        ft.Divider(color=AppColors.BORDER, height=1),
                        description_section,
                        includes_section,
                        warranty_section,
                        terms_section,
                        activation_section,
                        ft.Divider(color=AppColors.BORDER, height=1),
                        info_section("Pilih Paket", [package_radio]),
                        qty_stepper,
                    ],
                ),
            ),
            ft.Container(height=110),  # spacer supaya tidak ketutup bottom bar
        ],
    )

    bottom_bar = ft.Container(
        padding=ft.padding.only(left=20, right=20, top=14, bottom=18),
        bgcolor=ft.colors.WHITE,
        border=ft.border.only(top=ft.BorderSide(1, AppColors.BORDER)),
        content=ft.Column(spacing=10, controls=[
            ft.Row(alignment=ft.MainAxisAlignment.SPACE_BETWEEN, controls=[
                ft.Text("Total Harga", size=12, color=AppColors.TEXT_GRAY),
                total_text,
            ]),
            order_button,
        ]),
    )

    return ft.Container(
        expand=True, bgcolor=AppColors.BACKGROUND,
        content=ft.Stack(expand=True, controls=[
            body,
            ft.Container(bottom=0, left=0, right=0, content=bottom_bar),
        ]),
    )
