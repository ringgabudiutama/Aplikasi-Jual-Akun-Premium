"""FAQ accordion — expand/collapse dengan animasi tinggi halus."""
import flet as ft
from theme.colors import AppColors, AppRadius


def faq_item(question: str, answer: str) -> ft.Container:
    expanded = {"value": False}

    icon = ft.Icon(ft.icons.KEYBOARD_ARROW_DOWN_ROUNDED, color=AppColors.PRIMARY)
    answer_box = ft.Container(
        content=ft.Text(answer, size=12.5, color=AppColors.TEXT_GRAY),
        height=0,
        opacity=0,
        animate=ft.Animation(250, ft.AnimationCurve.EASE_OUT),
        animate_opacity=250,
        padding=ft.padding.only(top=0),
    )

    def toggle(e):
        expanded["value"] = not expanded["value"]
        if expanded["value"]:
            answer_box.height = None
            answer_box.opacity = 1
            answer_box.padding = ft.padding.only(top=10)
            icon.rotate = ft.Rotate(3.14159)
        else:
            answer_box.height = 0
            answer_box.opacity = 0
            answer_box.padding = ft.padding.only(top=0)
            icon.rotate = ft.Rotate(0)
        answer_box.update()
        icon.update()

    icon.animate_rotation = ft.Animation(250, ft.AnimationCurve.EASE_OUT)

    return ft.Container(
        padding=14,
        border_radius=AppRadius.CARD - 4,
        bgcolor=ft.colors.WHITE,
        border=ft.border.all(1, AppColors.BORDER),
        content=ft.Column(
            controls=[
                ft.Container(
                    on_click=toggle,
                    content=ft.Row(
                        alignment=ft.MainAxisAlignment.SPACE_BETWEEN,
                        controls=[
                            ft.Text(question, size=13, weight=ft.FontWeight.W_600,
                                     color=AppColors.TEXT_DARK, expand=True),
                            icon,
                        ],
                    ),
                ),
                answer_box,
            ],
        ),
    )
