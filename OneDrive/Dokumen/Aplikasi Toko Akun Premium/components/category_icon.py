"""Icon kategori bulat (Canva, ChatGPT, Netflix, dst) untuk baris kategori di Dashboard."""
import flet as ft
from theme.colors import AppColors


def category_icon(category: dict, on_tap, selected=False) -> ft.Container:
    return ft.Container(
        on_click=lambda e: on_tap(category["id"]),
        width=72,
        animate_scale=ft.Animation(150, ft.AnimationCurve.EASE_OUT),
        content=ft.Column(
            spacing=6,
            horizontal_alignment=ft.CrossAxisAlignment.CENTER,
            controls=[
                ft.Container(
                    width=56,
                    height=56,
                    border_radius=28,
                    alignment=ft.alignment.center,
                    bgcolor=AppColors.PRIMARY if selected else AppColors.SURFACE,
                    border=ft.border.all(1, AppColors.BORDER) if not selected else None,
                    content=ft.Icon(
                        category["icon"],
                        size=24,
                        color=ft.colors.WHITE if selected else AppColors.PRIMARY,
                    ),
                ),
                ft.Text(
                    category["name"],
                    size=11,
                    color=AppColors.TEXT_DARK,
                    weight=ft.FontWeight.W_500,
                    text_align=ft.TextAlign.CENTER,
                    max_lines=1,
                ),
            ],
        ),
    )
