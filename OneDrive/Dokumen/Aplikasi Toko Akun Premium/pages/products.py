"""
Halaman Produk — pencarian realtime + filter (Harga, Kategori, Terbaru, Terlaris).
Grid responsive: menyesuaikan jumlah kolom lewat max_extent GridView.
"""
import asyncio
import flet as ft
from theme.colors import AppColors, AppRadius
from data.store_data import PRODUCTS, CATEGORIES
from components.product_card import product_card
from components.skeleton import skeleton_product_card


FILTERS = ["Semua", "Terlaris", "Terbaru", "Harga Terendah", "Harga Tertinggi"]


def build_products_page(page: ft.Page, state, on_open_product, initial_category=None, initial_query=None) -> ft.Container:
    active_filter = {"value": "Semua"}
    active_category = {"value": initial_category}

    grid = ft.GridView(
        expand=True, max_extent=180, child_aspect_ratio=0.62, spacing=14, run_spacing=14,
        padding=ft.padding.only(left=20, right=20, top=16, bottom=30),
    )

    empty_state = ft.Container(
        expand=True, visible=False, alignment=ft.alignment.center,
        content=ft.Column(
            horizontal_alignment=ft.CrossAxisAlignment.CENTER, spacing=8,
            controls=[
                ft.Icon(ft.icons.SEARCH_OFF_ROUNDED, size=48, color=AppColors.TEXT_LIGHT_GRAY),
                ft.Text("Produk tidak ditemukan", color=AppColors.TEXT_GRAY, size=13),
            ],
        ),
    )

    search_field = ft.TextField(
        hint_text="Cari produk...",
        prefix_icon=ft.icons.SEARCH_ROUNDED,
        border_radius=AppRadius.BUTTON,
        border_color=AppColors.BORDER,
        focused_border_color=AppColors.PRIMARY,
        filled=True, fill_color=ft.colors.WHITE,
        content_padding=ft.padding.symmetric(horizontal=16, vertical=8),
        height=46,
        value=initial_query or "",
    )

    def get_filtered_products():
        items = list(PRODUCTS)
        query = (search_field.value or "").strip().lower()
        if query:
            items = [p for p in items if query in p["name"].lower() or query in p["category"]]
        if active_category["value"]:
            items = [p for p in items if p["category"] == active_category["value"]]

        f = active_filter["value"]
        if f == "Terlaris":
            items.sort(key=lambda p: p["sold"], reverse=True)
        elif f == "Terbaru":
            items.sort(key=lambda p: p["is_new"], reverse=True)
        elif f == "Harga Terendah":
            items.sort(key=lambda p: p["price_from"])
        elif f == "Harga Tertinggi":
            items.sort(key=lambda p: p["price_from"], reverse=True)
        return items

    def render_grid():
        items = get_filtered_products()
        grid.controls = [
            product_card(
                p, state.is_favorite(p["id"]), width=None,
                on_tap=on_open_product,
                on_toggle_favorite=lambda pid: (state.toggle_favorite(pid), render_grid()),
            )
            for p in items
        ]
        empty_state.visible = len(items) == 0
        grid.visible = len(items) > 0
        if grid.page:
            grid.update()
            empty_state.update()

    async def show_skeleton_then_render():
        grid.controls = [skeleton_product_card() for _ in range(6)]
        if grid.page:
            grid.update()
        await asyncio.sleep(0.5)
        render_grid()

    def on_search_change(e):
        render_grid()

    search_field.on_change = on_search_change

    def set_filter(name: str):
        active_filter["value"] = name
        for chip in filter_chips.controls:
            selected = chip.data == name
            chip.bgcolor = AppColors.PRIMARY if selected else ft.colors.WHITE
            chip.content.color = ft.colors.WHITE if selected else AppColors.TEXT_DARK
        filter_chips.update()
        render_grid()

    filter_chips = ft.Row(
        spacing=8, scroll=ft.ScrollMode.HIDDEN,
        controls=[
            ft.Container(
                data=name,
                on_click=lambda e, n=name: set_filter(n),
                padding=ft.padding.symmetric(horizontal=14, vertical=8),
                border_radius=100,
                border=ft.border.all(1, AppColors.BORDER),
                bgcolor=AppColors.PRIMARY if name == "Semua" else ft.colors.WHITE,
                content=ft.Text(name, size=12, weight=ft.FontWeight.W_500,
                                 color=ft.colors.WHITE if name == "Semua" else AppColors.TEXT_DARK),
            )
            for name in FILTERS
        ],
    )

    category_chips = ft.Row(
        spacing=8, scroll=ft.ScrollMode.HIDDEN,
        controls=[
            ft.Container(
                data=cat["id"],
                on_click=lambda e, cid=cat["id"]: set_category(cid),
                padding=ft.padding.symmetric(horizontal=12, vertical=6),
                border_radius=100,
                border=ft.border.all(1, AppColors.PRIMARY if active_category["value"] == cat["id"] else AppColors.BORDER),
                content=ft.Text(cat["name"], size=11.5, color=AppColors.PRIMARY if active_category["value"] == cat["id"] else AppColors.TEXT_GRAY),
            )
            for cat in CATEGORIES
        ],
    )

    def set_category(cid):
        active_category["value"] = None if active_category["value"] == cid else cid
        for chip in category_chips.controls:
            selected = chip.data == active_category["value"]
            chip.border = ft.border.all(1, AppColors.PRIMARY if selected else AppColors.BORDER)
            chip.content.color = AppColors.PRIMARY if selected else AppColors.TEXT_GRAY
        category_chips.update()
        render_grid()

    header = ft.Container(
        padding=ft.padding.only(left=20, right=20, top=50, bottom=16),
        bgcolor=ft.colors.WHITE,
        content=ft.Column(
            spacing=14,
            controls=[
                ft.Text("Semua Produk", size=20, weight=ft.FontWeight.W_800, color=AppColors.TEXT_DARK),
                search_field,
                filter_chips,
                category_chips,
            ],
        ),
    )

    root = ft.Container(
        expand=True, bgcolor=AppColors.SURFACE,
        content=ft.Column(spacing=0, expand=True, controls=[header, ft.Stack(expand=True, controls=[grid, empty_state])]),
    )
    root.did_mount = lambda: root.page.run_task(show_skeleton_then_render) if root.page else None
    return root
