"""Splash Screen — logo fade + scale in, lalu otomatis lanjut ke Dashboard."""
import asyncio
import flet as ft
from theme.colors import AppColors


def build_splash(on_finish) -> ft.Container:
    logo = ft.Container(
        width=96,
        height=96,
        border_radius=28,
        bgcolor=ft.colors.WHITE,
        alignment=ft.alignment.center,
        opacity=0,
        scale=0.7,
        animate_opacity=700,
        animate_scale=ft.Animation(700, ft.AnimationCurve.EASE_OUT_BACK),
        content=ft.Icon(ft.icons.WORKSPACE_PREMIUM_ROUNDED, size=48, color=AppColors.PRIMARY),
    )

    title = ft.Text(
        "Rifora Premium", size=24, weight=ft.FontWeight.W_800, color=ft.colors.WHITE, opacity=0,
        animate_opacity=700,
    )
    subtitle = ft.Text(
        "Your Trusted Premium Account Store", size=12, color=ft.colors.with_opacity(0.85, ft.colors.WHITE),
        opacity=0, animate_opacity=700,
    )

    progress = ft.Container(
        width=120, height=4, border_radius=2, bgcolor=ft.colors.with_opacity(0.25, ft.colors.WHITE),
        content=ft.Container(
            width=0, height=4, border_radius=2, bgcolor=ft.colors.WHITE,
            animate=ft.Animation(1400, ft.AnimationCurve.EASE_IN_OUT),
        ),
    )

    container = ft.Container(
        expand=True,
        gradient=ft.LinearGradient(
            begin=ft.alignment.top_center,
            end=ft.alignment.bottom_center,
            colors=[AppColors.PRIMARY, AppColors.PRIMARY_DARK],
        ),
        alignment=ft.alignment.center,
        content=ft.Column(
            alignment=ft.MainAxisAlignment.CENTER,
            horizontal_alignment=ft.CrossAxisAlignment.CENTER,
            spacing=14,
            controls=[logo, title, subtitle, ft.Container(height=30), progress],
        ),
    )

    async def animate_in():
        await asyncio.sleep(0.1)
        logo.opacity = 1
        logo.scale = 1
        logo.update()
        await asyncio.sleep(0.2)
        title.opacity = 1
        title.update()
        await asyncio.sleep(0.15)
        subtitle.opacity = 1
        subtitle.update()
        progress.content.width = 120
        progress.content.update()
        await asyncio.sleep(1.6)
        on_finish()

    container.did_mount = lambda: container.page.run_task(animate_in) if container.page else None
    return container
