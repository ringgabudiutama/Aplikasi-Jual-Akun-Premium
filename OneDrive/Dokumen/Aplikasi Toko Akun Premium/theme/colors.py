"""
Palet warna & style global Rifora Premium.
Semua warna & radius disatukan di sini supaya konsisten di seluruh app
dan gampang diubah tanpa menyentuh tiap halaman satu-satu.
"""
import flet as ft


class AppColors:
    PRIMARY = "#E53935"
    PRIMARY_DARK = "#B71C1C"
    SECONDARY = "#FF4D4F"
    ACCENT = "#FFCDD2"
    BACKGROUND = "#FFFFFF"
    SURFACE = "#FFF7F7"

    TEXT_DARK = "#1A1A1A"
    TEXT_GRAY = "#757575"
    TEXT_LIGHT_GRAY = "#9E9E9E"

    SUCCESS = "#25D366"  # warna WhatsApp untuk tombol order
    STAR = "#FFC107"
    BORDER = "#F0E0E0"
    SKELETON_BASE = "#EEEEEE"
    SKELETON_HIGHLIGHT = "#F7F7F7"


class AppRadius:
    CARD = 22
    BUTTON = 18
    SHEET = 28
    CHIP = 100


class AppShadow:
    """Soft shadow standar untuk semua card."""

    @staticmethod
    def soft():
        return ft.BoxShadow(
            spread_radius=0,
            blur_radius=18,
            color=ft.colors.with_opacity(0.08, "#000000"),
            offset=ft.Offset(0, 6),
        )

    @staticmethod
    def elevated():
        return ft.BoxShadow(
            spread_radius=0,
            blur_radius=26,
            color=ft.colors.with_opacity(0.16, AppColors.PRIMARY),
            offset=ft.Offset(0, 10),
        )


FONT_FAMILY = "Poppins"

GOOGLE_FONTS = {
    "Poppins": "https://raw.githubusercontent.com/google/fonts/main/ofl/poppins/Poppins-Regular.ttf",
    "Poppins-SemiBold": "https://raw.githubusercontent.com/google/fonts/main/ofl/poppins/Poppins-SemiBold.ttf",
    "Poppins-Bold": "https://raw.githubusercontent.com/google/fonts/main/ofl/poppins/Poppins-Bold.ttf",
}
