"""
Skeleton loading — dipakai saat data sedang 'dimuat' (bukan spinner, sesuai spec).
Efek shimmer dibuat dengan animasi opacity bolak-balik antara dua warna abu muda.
"""
import asyncio
import flet as ft
from theme.colors import AppColors, AppRadius


def skeleton_box(width=None, height=20, radius=8) -> ft.Container:
    box = ft.Container(
        width=width,
        height=height,
        bgcolor=AppColors.SKELETON_BASE,
        border_radius=radius,
        animate_opacity=600,
    )

    async def shimmer():
        # loop opacity 1.0 <-> 0.55 untuk efek shimmer halus
        while box.page:
            box.opacity = 0.55
            box.update()
            await asyncio.sleep(0.6)
            box.opacity = 1.0
            box.update()
            await asyncio.sleep(0.6)

    box.did_mount = lambda: box.page.run_task(shimmer) if box.page else None
    return box


def skeleton_product_card() -> ft.Container:
    return ft.Container(
        width=165,
        border_radius=AppRadius.CARD,
        bgcolor=ft.Colors.WHITE,
        padding=12,
        content=ft.Column(
            spacing=10,
            controls=[
                skeleton_box(height=100, radius=16),
                skeleton_box(height=14, width=120),
                skeleton_box(height=12, width=80),
                skeleton_box(height=18, width=100),
            ],
        ),
    )


def skeleton_row(count=3) -> ft.Row:
    return ft.Row(
        spacing=14,
        scroll=ft.ScrollMode.HIDDEN,
        controls=[skeleton_product_card() for _ in range(count)],
    )