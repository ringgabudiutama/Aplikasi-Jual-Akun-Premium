"""
AI Assistant — tampilan chat bergaya ChatGPT. Menjawab HANYA informasi toko
(harga, garansi, cara order, cara aktivasi, produk, jam operasional) lewat
rule-based engine di services/ai_engine.py (tanpa API eksternal).
"""
import asyncio
import flet as ft
from theme.colors import AppColors, AppRadius
from services.ai_engine import get_ai_response

QUICK_PROMPTS = ["Cara order?", "Berapa harga Netflix?", "Garansi berapa lama?", "Jam operasional?"]


def build_ai_assistant_page(page: ft.Page, state) -> ft.Container:
    chat_list = ft.ListView(expand=True, spacing=12, padding=ft.padding.only(left=16, right=16, top=16, bottom=8), auto_scroll=True)
    typing_indicator = ft.Container(visible=False)

    def bubble(text: str, is_user: bool) -> ft.Row:
        return ft.Row(
            alignment=ft.MainAxisAlignment.END if is_user else ft.MainAxisAlignment.START,
            controls=[
                ft.Container(
                    padding=12,
                    border_radius=ft.border_radius.only(
                        top_left=16, top_right=16,
                        bottom_left=4 if is_user else 16,
                        bottom_right=16 if is_user else 4,
                    ),
                    bgcolor=AppColors.PRIMARY if is_user else ft.colors.WHITE,
                    border=None if is_user else ft.border.all(1, AppColors.BORDER),
                    width=260,
                    content=ft.Text(text, size=13, color=ft.colors.WHITE if is_user else AppColors.TEXT_DARK),
                )
            ],
        )

    def render_history():
        chat_list.controls = [bubble(m["text"], m["role"] == "user") for m in state.chat_history]
        if chat_list.page:
            chat_list.update()

    input_field = ft.TextField(
        hint_text="Tanya sesuatu tentang toko...",
        border_radius=AppRadius.BUTTON,
        border_color=AppColors.BORDER,
        focused_border_color=AppColors.PRIMARY,
        filled=True, fill_color=ft.colors.WHITE,
        content_padding=ft.padding.symmetric(horizontal=16, vertical=10),
        expand=True,
    )

    async def send_message(text: str):
        if not text.strip():
            return
        state.chat_history.append({"role": "user", "text": text})
        render_history()
        input_field.value = ""
        input_field.update()

        # indikator "AI sedang mengetik"
        chat_list.controls.append(
            ft.Row(controls=[ft.Container(
                padding=12, border_radius=16, bgcolor=ft.colors.WHITE,
                border=ft.border.all(1, AppColors.BORDER),
                content=ft.Row(spacing=4, controls=[ft.Text("●", color=AppColors.TEXT_LIGHT_GRAY) for _ in range(3)]),
            )])
        )
        chat_list.update()
        await asyncio.sleep(0.6)
        chat_list.controls.pop()

        response = get_ai_response(text)
        state.chat_history.append({"role": "ai", "text": response})
        render_history()

    def on_send_click(e):
        page.run_task(send_message, input_field.value)

    input_field.on_submit = on_send_click

    quick_prompts_row = ft.Row(
        spacing=8, scroll=ft.ScrollMode.HIDDEN,
        controls=[
            ft.Container(
                padding=ft.padding.symmetric(horizontal=12, vertical=8), border_radius=100,
                border=ft.border.all(1, AppColors.PRIMARY),
                on_click=lambda e, t=prompt: page.run_task(send_message, t),
                content=ft.Text(prompt, size=11.5, color=AppColors.PRIMARY),
            )
            for prompt in QUICK_PROMPTS
        ],
    )

    header = ft.Container(
        padding=ft.padding.only(left=20, right=20, top=50, bottom=16),
        bgcolor=ft.colors.WHITE,
        border=ft.border.only(bottom=ft.BorderSide(1, AppColors.BORDER)),
        content=ft.Row(
            controls=[
                ft.Container(
                    width=40, height=40, border_radius=20, bgcolor=AppColors.PRIMARY,
                    alignment=ft.alignment.center,
                    content=ft.Icon(ft.icons.SMART_TOY_ROUNDED, color=ft.colors.WHITE, size=20),
                ),
                ft.Column(spacing=0, controls=[
                    ft.Text("Rifora AI Assistant", size=14, weight=ft.FontWeight.W_700, color=AppColors.TEXT_DARK),
                    ft.Text("Online · Siap membantu", size=11, color=AppColors.SUCCESS),
                ]),
            ],
        ),
    )

    input_bar = ft.Container(
        padding=ft.padding.only(left=16, right=16, top=10, bottom=16),
        bgcolor=ft.colors.WHITE,
        border=ft.border.only(top=ft.BorderSide(1, AppColors.BORDER)),
        content=ft.Column(spacing=8, controls=[
            quick_prompts_row,
            ft.Row(spacing=8, controls=[
                input_field,
                ft.Container(
                    width=44, height=44, border_radius=22, bgcolor=AppColors.PRIMARY,
                    alignment=ft.alignment.center, on_click=on_send_click,
                    content=ft.Icon(ft.icons.SEND_ROUNDED, color=ft.colors.WHITE, size=18),
                ),
            ]),
        ]),
    )

    if not state.chat_history:
        state.chat_history.append({
            "role": "ai",
            "text": "Halo! Aku Rifora AI Assistant 👋 Tanyakan apa saja seputar produk, harga, garansi, atau cara order ya!",
        })
    render_history()

    return ft.Container(
        expand=True, bgcolor=AppColors.SURFACE,
        content=ft.Column(expand=True, spacing=0, controls=[header, chat_list, input_bar]),
    )
