"""
Banner promo auto slider — fade transition tiap beberapa detik menggunakan
AnimatedSwitcher, ditambah dot indicator di bawah.
"""
import asyncio
import flet as ft
from theme.colors import AppColors, AppRadius


def _banner_slide(banner: dict) -> ft.Container:
    return ft.Container(
        border_radius=AppRadius.CARD,
        padding=20,
        gradient=ft.LinearGradient(
            begin=ft.alignment.top_left,
            end=ft.alignment.bottom_right,
            colors=[AppColors.PRIMARY, AppColors.SECONDARY],
        ),
        content=ft.Row(
            alignment=ft.MainAxisAlignment.SPACE_BETWEEN,
            controls=[
                ft.Column(
                    spacing=4,
                    controls=[
                        ft.Text(banner["title"], size=16, weight=ft.FontWeight.W_700, color=ft.colors.WHITE),
                        ft.Text(banner["subtitle"], size=12, color=ft.colors.with_opacity(0.9, ft.colors.WHITE)),
                    ],
                ),
                ft.Container(
                    width=48,
                    height=48,
                    border_radius=24,
                    bgcolor=ft.colors.with_opacity(0.2, ft.colors.WHITE),
                    alignment=ft.alignment.center,
                    content=ft.Icon(banner["icon"], color=ft.colors.WHITE, size=24),
                ),
            ],
        ),
    )


def promo_banner_slider(banners: list[dict]) -> ft.Container:
    index = {"value": 0}

    switcher = ft.AnimatedSwitcher(
        content=_banner_slide(banners[0]),
        transition=ft.AnimatedSwitcherTransition.FADE,
        duration=500,
        reverse_duration=300,
    )

    dots = ft.Row(
        alignment=ft.MainAxisAlignment.CENTER,
        spacing=6,
        controls=[
            ft.Container(width=6, height=6, border_radius=3,
                         bgcolor=AppColors.PRIMARY if i == 0 else AppColors.BORDER)
            for i in range(len(banners))
        ],
    )

    wrapper = ft.Container(content=ft.Column(spacing=10, controls=[switcher, dots]))

    async def auto_slide():
        while switcher.page:
            await asyncio.sleep(4)
            index["value"] = (index["value"] + 1) % len(banners)
            switcher.content = _banner_slide(banners[index["value"]])
            for i, dot in enumerate(dots.controls):
                dot.bgcolor = AppColors.PRIMARY if i == index["value"] else AppColors.BORDER
            if switcher.page:
                switcher.update()
                dots.update()

    wrapper.did_mount = lambda: wrapper.page.run_task(auto_slide) if wrapper.page else None
    return wrapper
