"""
Bottom Navigation kustom — 5 tab: Dashboard, Produk, AI Assistant, Favorit, Profil.
Dibuat custom (bukan NavigationBar bawaan) supaya bisa full kontrol animasi &
gaya premium (indicator pill merah, icon outline/filled saat aktif).
"""
import flet as ft
from theme.colors import AppColors

NAV_ITEMS = [
    {"label": "Dashboard", "icon": ft.icons.HOME_OUTLINED, "icon_active": ft.icons.HOME_ROUNDED},
    {"label": "Produk", "icon": ft.icons.GRID_VIEW_OUTLINED, "icon_active": ft.icons.GRID_VIEW_ROUNDED},
    {"label": "AI Assistant", "icon": ft.icons.SMART_TOY_OUTLINED, "icon_active": ft.icons.SMART_TOY_ROUNDED},
    {"label": "Favorit", "icon": ft.icons.FAVORITE_BORDER_ROUNDED, "icon_active": ft.icons.FAVORITE_ROUNDED},
    {"label": "Profil", "icon": ft.icons.PERSON_OUTLINE_ROUNDED, "icon_active": ft.icons.PERSON_ROUNDED},
]


def build_bottom_nav(selected_index: int, on_change) -> ft.Container:
    """on_change: callback(index:int) dipanggil saat tab ditekan."""

    def item(index: int):
        active = index == selected_index
        data = NAV_ITEMS[index]
        return ft.Container(
            on_click=lambda e, i=index: on_change(i),
            padding=ft.padding.symmetric(horizontal=14, vertical=8),
            border_radius=100,
            bgcolor=ft.colors.with_opacity(0.12, AppColors.PRIMARY) if active else ft.colors.TRANSPARENT,
            animate=ft.Animation(250, ft.AnimationCurve.EASE_OUT),
            content=ft.Column(
                spacing=2,
                horizontal_alignment=ft.CrossAxisAlignment.CENTER,
                controls=[
                    ft.Icon(
                        data["icon_active"] if active else data["icon"],
                        color=AppColors.PRIMARY if active else AppColors.TEXT_LIGHT_GRAY,
                        size=23,
                    ),
                    ft.Text(
                        data["label"],
                        size=10,
                        weight=ft.FontWeight.W_600 if active else ft.FontWeight.W_400,
                        color=AppColors.PRIMARY if active else AppColors.TEXT_LIGHT_GRAY,
                    ),
                ],
            ),
        )

    return ft.Container(
        padding=ft.padding.symmetric(horizontal=8, vertical=10),
        bgcolor=ft.colors.WHITE,
        border=ft.border.only(top=ft.BorderSide(1, AppColors.BORDER)),
        content=ft.Row(
            alignment=ft.MainAxisAlignment.SPACE_AROUND,
            controls=[item(i) for i in range(len(NAV_ITEMS))],
        ),
    )
