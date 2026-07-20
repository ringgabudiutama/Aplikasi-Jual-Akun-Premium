import { forwardRef, useState } from 'react'
import { UploadCloud, CheckCircle2 } from 'lucide-react'

/**
 * All fields below use React.forwardRef so that spreading react-hook-form's
 * register() output directly onto them — e.g. <TextField {...register('email', {...})} />
 * — correctly wires up the ref, onChange, and onBlur to the underlying native
 * input/textarea/select.
 *
 * IMPORTANT: register('email') also returns a `name` prop, which react-hook-form
 * relies on internally (via the field's `name` HTML attribute) to know which
 * field an onChange/onBlur event belongs to. Every field below destructures
 * `name` out of props (to build `id`/`htmlFor`), so it must be explicitly
 * re-attached as `name={name}` on the actual <input>/<textarea>/<select> —
 * otherwise it silently disappears from the spread and the browser element
 * never gets a `name` attribute. When that happens, typing/selecting/uploading
 * updates the DOM node just fine (so it *looks* filled in), but react-hook-form
 * can't match the change back to the right field, so it keeps the field's
 * internal value empty — which is exactly why "wajib diisi" (required) errors
 * kept reappearing even after the user filled every field correctly.
 */

export const TextField = forwardRef(function TextField(
  { label, name, error, type = 'text', placeholder, required, ...rest },
  ref
) {
  return (
    <div>
      {label && (
        <label className="label-field" htmlFor={name}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        ref={ref}
        type={type}
        placeholder={placeholder}
        className="input-field"
        {...rest}
      />
      {error && <p className="error-text">{error.message}</p>}
    </div>
  )
})

export const TextareaField = forwardRef(function TextareaField(
  { label, name, error, rows = 4, placeholder, required, ...rest },
  ref
) {
  return (
    <div>
      {label && (
        <label className="label-field" htmlFor={name}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        ref={ref}
        rows={rows}
        placeholder={placeholder}
        className="input-field resize-none"
        {...rest}
      />
      {error && <p className="error-text">{error.message}</p>}
    </div>
  )
})

export const SelectField = forwardRef(function SelectField(
  { label, name, error, options = [], placeholder = 'Pilih salah satu', required, ...rest },
  ref
) {
  return (
    <div>
      {label && (
        <label className="label-field" htmlFor={name}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select id={name} name={name} ref={ref} className="input-field" {...rest}>
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="error-text">{error.message}</p>}
    </div>
  )
})

export const FileField = forwardRef(function FileField(
  { label, name, error, accept, hint, required, onChange, ...rest },
  ref
) {
  const [fileName, setFileName] = useState(null)

  const handleChange = (e) => {
    setFileName(e.target.files?.[0]?.name || null)
    onChange?.(e) // still notify react-hook-form's own onChange from register()
  }

  return (
    <div>
      {label && (
        <label className="label-field" htmlFor={name}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <label
        htmlFor={name}
        className={`flex items-center gap-3 border-2 border-dashed rounded-lg px-4 py-3 cursor-pointer transition text-sm ${
          fileName ? 'border-primary-400 bg-primary-50 text-primary-700' : 'border-primary-200 hover:bg-primary-50 text-ink/60'
        }`}
      >
        {fileName ? <CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> : <UploadCloud className="w-5 h-5 text-primary shrink-0" />}
        <span className="truncate font-medium">{fileName || hint || 'Klik untuk unggah file (JPG, PNG, atau PDF, maks. 2MB)'}</span>
      </label>
      <input id={name} name={name} ref={ref} type="file" accept={accept} className="hidden" onChange={handleChange} {...rest} />
      {error && <p className="error-text">{error.message}</p>}
    </div>
  )
})
