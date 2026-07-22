"""Header section reusable, dipakai di semua judul section Dashboard/Produk."""
import flet as ft
from theme.colors import AppColors


def section_header(title: str, on_view_all=None) -> ft.Row:
    controls = [ft.Text(title, size=16, weight=ft.FontWeight.W_700, color=AppColors.TEXT_DARK)]
    if on_view_all:
        controls.append(
            ft.TextButton(
                text="Lihat Semua",
                on_click=on_view_all,
                style=ft.ButtonStyle(color=AppColors.PRIMARY),
            )
        )
    return ft.Row(alignment=ft.MainAxisAlignment.SPACE_BETWEEN, controls=controls)
