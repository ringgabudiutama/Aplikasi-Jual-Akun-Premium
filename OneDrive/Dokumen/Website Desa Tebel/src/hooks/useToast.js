import Swal from 'sweetalert2'

/**
 * Thin wrapper around SweetAlert2 pre-configured with SI TEBEL brand styling.
 */
export default function useToast() {
  const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: { popup: 'rounded-xl' },
  })

  return {
    success: (title) => toast.fire({ icon: 'success', title, iconColor: '#1F6E43' }),
    error: (title) => toast.fire({ icon: 'error', title }),
    info: (title) => toast.fire({ icon: 'info', title, iconColor: '#D4A017' }),
    confirm: (options) =>
      Swal.fire({
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1F6E43',
        cancelButtonColor: '#9CA3AF',
        confirmButtonText: 'Ya, lanjutkan',
        cancelButtonText: 'Batal',
        ...options,
      }),
  }
}
