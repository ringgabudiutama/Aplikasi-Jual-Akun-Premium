"""Testimoni auto slider — card putih dengan rating bintang."""
import asyncio
import flet as ft
from theme.colors import AppColors, AppRadius, AppShadow


def _testimonial_slide(t: dict) -> ft.Container:
    return ft.Container(
        border_radius=AppRadius.CARD,
        bgcolor=ft.colors.WHITE,
        padding=18,
        shadow=AppShadow.soft(),
        content=ft.Column(
            spacing=8,
            controls=[
                ft.Row(
                    spacing=2,
                    controls=[
                        ft.Icon(ft.icons.STAR_ROUNDED, size=15, color=AppColors.STAR)
                        for _ in range(t["rating"])
                    ],
                ),
                ft.Text(f'"{t["text"]}"', size=13, color=AppColors.TEXT_DARK, italic=True),
                ft.Text(f'— {t["name"]}', size=12, weight=ft.FontWeight.W_600, color=AppColors.TEXT_GRAY),
            ],
        ),
    )


def testimonial_slider(testimonials: list[dict]) -> ft.Container:
    index = {"value": 0}
    switcher = ft.AnimatedSwitcher(
        content=_testimonial_slide(testimonials[0]),
        transition=ft.AnimatedSwitcherTransition.FADE,
        duration=500,
    )
    wrapper = ft.Container(content=switcher)

    async def auto_slide():
        while switcher.page:
            await asyncio.sleep(5)
            index["value"] = (index["value"] + 1) % len(testimonials)
            switcher.content = _testimonial_slide(testimonials[index["value"]])
            if switcher.page:
                switcher.update()

    wrapper.did_mount = lambda: wrapper.page.run_task(auto_slide) if wrapper.page else None
    return wrapper
