"""
Halaman Profil — avatar, nama, username, kontak, dan menu berbentuk card
(ubah password, edit profil, tentang aplikasi, kebijakan privasi,
syarat ketentuan, hubungi kami, logout). Semua data profil disimpan LOCAL.
"""
import flet as ft
from theme.colors import AppColors, AppRadius, AppShadow
from services.whatsapp import build_wa_link
from data.store_data import ADMINS


def build_profile_page(page: ft.Page, state, on_logout) -> ft.Container:
    profile = state.profile

    avatar = ft.Container(
        width=84, height=84, border_radius=42,
        gradient=ft.LinearGradient(colors=[AppColors.PRIMARY, AppColors.SECONDARY]),
        alignment=ft.alignment.center,
        content=ft.Text(profile["name"][:1].upper(), size=32, weight=ft.FontWeight.W_800, color=ft.colors.WHITE),
    )

    name_text = ft.Text(profile["name"], size=17, weight=ft.FontWeight.W_700, color=AppColors.TEXT_DARK)
    username_text = ft.Text(profile["username"], size=12.5, color=AppColors.TEXT_GRAY)

    info_column = ft.Column(spacing=10)

    def render_info():
        info_column.controls = [
            _info_row(ft.icons.PHONE_OUTLINED, "Nomor HP", profile.get("phone", "-")),
            _info_row(ft.icons.LOCATION_ON_OUTLINED, "Alamat", profile.get("address", "-")),
            _info_row(ft.icons.EMAIL_OUTLINED, "Email", profile.get("email", "-")),
        ]
        if info_column.page:
            info_column.update()

    def _info_row(icon, label, value):
        return ft.Container(
            padding=14, border_radius=16, bgcolor=ft.colors.WHITE, border=ft.border.all(1, AppColors.BORDER),
            content=ft.Row(controls=[
                ft.Icon(icon, size=18, color=AppColors.PRIMARY),
                ft.Column(spacing=0, expand=True, controls=[
                    ft.Text(label, size=10.5, color=AppColors.TEXT_LIGHT_GRAY),
                    ft.Text(value, size=13, color=AppColors.TEXT_DARK, weight=ft.FontWeight.W_500),
                ]),
            ]),
        )

    render_info()

    # ---------------- Edit Profil dialog ----------------
    name_field = ft.TextField(label="Nama", value=profile["name"])
    phone_field = ft.TextField(label="Nomor HP", value=profile.get("phone", ""))
    address_field = ft.TextField(label="Alamat", value=profile.get("address", ""))
    email_field = ft.TextField(label="Email", value=profile.get("email", ""))

    def save_profile(e):
        state.update_profile({
            "name": name_field.value or profile["name"],
            "phone": phone_field.value,
            "address": address_field.value,
            "email": email_field.value,
        })
        name_text.value = state.profile["name"]
        avatar.content.value = state.profile["name"][:1].upper()
        render_info()
        name_text.update()
        avatar.update()
        page.close(edit_dialog)

    edit_dialog = ft.AlertDialog(
        title=ft.Text("Edit Profil"),
        content=ft.Column(tight=True, spacing=10, width=320,
                            controls=[name_field, phone_field, address_field, email_field]),
        actions=[
            ft.TextButton("Batal", on_click=lambda e: page.close(edit_dialog)),
            ft.FilledButton("Simpan", on_click=save_profile, style=ft.ButtonStyle(bgcolor=AppColors.PRIMARY)),
        ],
    )

    # ---------------- Ubah Password dialog ----------------
    old_pw = ft.TextField(label="Password Lama", password=True, can_reveal_password=True)
    new_pw = ft.TextField(label="Password Baru", password=True, can_reveal_password=True)

    def save_password(e):
        page.close(password_dialog)
        page.open(ft.SnackBar(ft.Text("Password berhasil diperbarui."), bgcolor=AppColors.SUCCESS))

    password_dialog = ft.AlertDialog(
        title=ft.Text("Ubah Password"),
        content=ft.Column(tight=True, spacing=10, width=300, controls=[old_pw, new_pw]),
        actions=[
            ft.TextButton("Batal", on_click=lambda e: page.close(password_dialog)),
            ft.FilledButton("Simpan", on_click=save_password, style=ft.ButtonStyle(bgcolor=AppColors.PRIMARY)),
        ],
    )

    # ---------------- Info dialogs (Tentang / Privasi / Syarat) ----------------
    def info_dialog(title, text):
        dlg = ft.AlertDialog(
            title=ft.Text(title),
            content=ft.Container(width=300, content=ft.Text(text, size=12.5, color=AppColors.TEXT_GRAY)),
            actions=[ft.TextButton("Tutup", on_click=lambda e: page.close(dlg))],
        )
        page.open(dlg)

    def contact_us(e):
        admin = ADMINS[0]
        link = build_wa_link(admin["phone"], "Halo Admin Rifora Premium, saya ingin bertanya.")
        page.launch_url(link)

    def confirm_logout(e):
        def do_logout(ev):
            page.close(logout_dialog)
            on_logout()

        logout_dialog = ft.AlertDialog(
            title=ft.Text("Keluar Akun"),
            content=ft.Text("Apakah kamu yakin ingin logout?"),
            actions=[
                ft.TextButton("Batal", on_click=lambda ev: page.close(logout_dialog)),
                ft.FilledButton("Logout", on_click=do_logout, style=ft.ButtonStyle(bgcolor=AppColors.PRIMARY)),
            ],
        )
        page.open(logout_dialog)

    MENU_ITEMS = [
        (ft.icons.LOCK_OUTLINE_ROUNDED, "Ubah Password", lambda e: page.open(password_dialog)),
        (ft.icons.EDIT_OUTLINED, "Edit Profil", lambda e: page.open(edit_dialog)),
        (ft.icons.INFO_OUTLINE_ROUNDED, "Tentang Aplikasi",
         lambda e: info_dialog("Tentang Aplikasi", "Rifora Premium v1.0.0\nAplikasi jual beli akun premium digital terpercaya.")),
        (ft.icons.PRIVACY_TIP_OUTLINED, "Kebijakan Privasi",
         lambda e: info_dialog("Kebijakan Privasi", "Data pribadi kamu disimpan secara lokal di perangkat dan tidak dibagikan ke pihak ketiga.")),
        (ft.icons.DESCRIPTION_OUTLINED, "Syarat Ketentuan",
         lambda e: info_dialog("Syarat & Ketentuan", "Dengan menggunakan Rifora Premium, kamu setuju mengikuti semua syarat penggunaan produk yang tertera di setiap halaman detail produk.")),
        (ft.icons.SUPPORT_AGENT_OUTLINED, "Hubungi Kami", contact_us),
        (ft.icons.LOGOUT_ROUNDED, "Logout", confirm_logout),
    ]

    def menu_card(icon, label, on_click, danger=False):
        return ft.Container(
            padding=14, border_radius=16, bgcolor=ft.colors.WHITE, border=ft.border.all(1, AppColors.BORDER),
            on_click=on_click, ink=True,
            content=ft.Row(controls=[
                ft.Icon(icon, size=19, color=AppColors.PRIMARY if not danger else "#D32F2F"),
                ft.Text(label, size=13, weight=ft.FontWeight.W_500,
                         color=AppColors.TEXT_DARK if not danger else "#D32F2F", expand=True),
                ft.Icon(ft.icons.CHEVRON_RIGHT_ROUNDED, size=18, color=AppColors.TEXT_LIGHT_GRAY),
            ]),
        )

    menu_column = ft.Column(spacing=10, controls=[
        menu_card(icon, label, cb, danger=(label == "Logout")) for icon, label, cb in MENU_ITEMS
    ])

    header = ft.Container(
        padding=ft.padding.only(top=50, bottom=24),
        alignment=ft.alignment.center,
        gradient=ft.LinearGradient(colors=[AppColors.PRIMARY, AppColors.SECONDARY]),
        content=ft.Column(
            horizontal_alignment=ft.CrossAxisAlignment.CENTER, spacing=8,
            controls=[avatar, name_text, username_text],
        ),
    )

    body = ft.Column(
        expand=True, scroll=ft.ScrollMode.AUTO, spacing=20,
        controls=[
            header,
            ft.Container(padding=ft.padding.symmetric(horizontal=20),
                          content=ft.Column(spacing=20, controls=[info_column, menu_column])),
            ft.Container(height=20),
        ],
    )

    return ft.Container(expand=True, bgcolor=AppColors.SURFACE, content=body)
