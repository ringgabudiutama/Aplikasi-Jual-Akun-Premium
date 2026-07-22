"""
Card produk — dipakai di Dashboard (list horizontal) & halaman Produk (grid).
Fitur: badge (BEST SELLER/HOT/NEW), rating, harga, tombol favorit, hover naik sedikit.
"""
import flet as ft
from theme.colors import AppColors, AppRadius, AppShadow
from services.whatsapp import format_rupiah

BADGE_COLORS = {
    "BEST SELLER": AppColors.PRIMARY,
    "HOT": "#FF6D00",
    "NEW": "#2E7D32",
}


def product_card(product: dict, is_favorite: bool, on_tap, on_toggle_favorite, width=165) -> ft.Container:
    badge = product.get("badge")

    card = ft.Container(
        width=width,
        border_radius=AppRadius.CARD,
        bgcolor=ft.colors.WHITE,
        padding=12,
        shadow=AppShadow.soft(),
        animate=ft.Animation(200, ft.AnimationCurve.EASE_OUT),
        animate_scale=ft.Animation(150, ft.AnimationCurve.EASE_OUT),
        on_click=lambda e: on_tap(product),
        ink=True,
        content=ft.Column(
            spacing=8,
            controls=[
                ft.Stack(
                    controls=[
                        ft.Container(
                            height=100,
                            border_radius=16,
                            gradient=ft.LinearGradient(
                                begin=ft.alignment.top_left,
                                end=ft.alignment.bottom_right,
                                colors=[AppColors.ACCENT, ft.colors.WHITE],
                            ),
                            alignment=ft.alignment.center,
                            content=ft.Icon(product["icon"], size=42, color=AppColors.PRIMARY),
                        ),
                        ft.Container(
                            top=6,
                            left=6,
                            visible=bool(badge),
                            padding=ft.padding.symmetric(horizontal=8, vertical=3),
                            border_radius=100,
                            bgcolor=BADGE_COLORS.get(badge, AppColors.PRIMARY),
                            content=ft.Text(badge or "", size=9, color=ft.colors.WHITE, weight=ft.FontWeight.W_700),
                        ),
                        ft.Container(
                            top=4,
                            right=4,
                            border_radius=100,
                            bgcolor=ft.colors.with_opacity(0.9, ft.colors.WHITE),
                            padding=5,
                            on_click=lambda e: on_toggle_favorite(product["id"]),
                            content=ft.Icon(
                                ft.icons.FAVORITE_ROUNDED if is_favorite else ft.icons.FAVORITE_BORDER_ROUNDED,
                                size=16,
                                color=AppColors.PRIMARY if is_favorite else AppColors.TEXT_LIGHT_GRAY,
                            ),
                        ),
                    ]
                ),
                ft.Text(product["name"], size=13, weight=ft.FontWeight.W_600, color=AppColors.TEXT_DARK, max_lines=1),
                ft.Row(
                    spacing=3,
                    controls=[
                        ft.Icon(ft.icons.STAR_ROUNDED, size=13, color=AppColors.STAR),
                        ft.Text(str(product["rating"]), size=11, color=AppColors.TEXT_GRAY),
                        ft.Text(f"· {product['sold']} terjual", size=11, color=AppColors.TEXT_GRAY),
                    ],
                ),
                ft.Row(
                    alignment=ft.MainAxisAlignment.SPACE_BETWEEN,
                    controls=[
                        ft.Text(
                            f"Mulai {format_rupiah(product['price_from'])}",
                            size=13,
                            weight=ft.FontWeight.W_700,
                            color=AppColors.PRIMARY,
                        ),
                    ],
                ),
            ],
        ),
    )

    def on_hover(e: ft.HoverEvent):
        card.scale = 1.03 if e.data == "true" else 1.0
        card.shadow = AppShadow.elevated() if e.data == "true" else AppShadow.soft()
        card.update()

    card.on_hover = on_hover
    return card
