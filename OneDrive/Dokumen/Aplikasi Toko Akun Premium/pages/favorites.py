"""Halaman Favorit — daftar produk favorit, kosong apabila belum ada."""
import flet as ft
from theme.colors import AppColors
from data.store_data import PRODUCTS
from components.product_card import product_card


def build_favorites_page(page: ft.Page, state, on_open_product) -> ft.Container:
    grid = ft.GridView(expand=True, max_extent=180, child_aspect_ratio=0.62, spacing=14, run_spacing=14,
                         padding=ft.padding.only(left=20, right=20, top=16, bottom=30))

    empty_state = ft.Container(
        expand=True, visible=False, alignment=ft.alignment.center,
        content=ft.Column(
            horizontal_alignment=ft.CrossAxisAlignment.CENTER, spacing=10,
            controls=[
                ft.Icon(ft.icons.FAVORITE_BORDER_ROUNDED, size=56, color=AppColors.TEXT_LIGHT_GRAY),
                ft.Text("Belum ada produk favorit", size=14, weight=ft.FontWeight.W_600, color=AppColors.TEXT_DARK),
                ft.Text("Tekan ikon hati pada produk untuk\nmenyimpannya di sini.", size=12,
                         color=AppColors.TEXT_GRAY, text_align=ft.TextAlign.CENTER),
            ],
        ),
    )

    def render():
        favorite_products = [p for p in PRODUCTS if p["id"] in state.favorites]
        grid.controls = [
            product_card(
                p, True, width=None,
                on_tap=on_open_product,
                on_toggle_favorite=lambda pid: (state.toggle_favorite(pid), render()),
            )
            for p in favorite_products
        ]
        empty_state.visible = len(favorite_products) == 0
        grid.visible = len(favorite_products) > 0
        if grid.page:
            grid.update()
            empty_state.update()

    state.on_favorites_changed.append(render)
    render()

    header = ft.Container(
        padding=ft.padding.only(left=20, right=20, top=50, bottom=14),
        bgcolor=ft.colors.WHITE,
        content=ft.Text("Favorit Saya", size=20, weight=ft.FontWeight.W_800, color=AppColors.TEXT_DARK),
    )

    return ft.Container(
        expand=True, bgcolor=AppColors.SURFACE,
        content=ft.Column(spacing=0, expand=True, controls=[header, ft.Stack(expand=True, controls=[grid, empty_state])]),
    )
