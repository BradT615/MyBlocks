// src/app/(protected)/_components/component-upload/utilities-selector.tsx
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

// Available utility libraries
const UTILITY_LIBRARIES = [
  { id: "tailwind", label: "Tailwind CSS" },
  { id: "bootstrap", label: "Bootstrap" },
  { id: "materialui", label: "Material UI" },
  { id: "chakraui", label: "Chakra UI" },
  { id: "shadcn", label: "Shadcn UI" }
]

interface UtilitiesSelectorProps {
  selectedUtilities: string[]
  onToggleUtility: (utilityId: string) => void
}

export function UtilitiesSelector({
  selectedUtilities,
  onToggleUtility
}: UtilitiesSelectorProps) {
  return (
    <div className="space-y-3">
      <Label>Utility Libraries</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {UTILITY_LIBRARIES.map(library => (
          <div key={library.id} className="flex items-center space-x-2">
            <Checkbox 
              id={`utility-${library.id}`}
              checked={selectedUtilities.includes(library.id)}
              onCheckedChange={() => onToggleUtility(library.id)}
            />
            <Label 
              htmlFor={`utility-${library.id}`}
              className="text-sm cursor-pointer"
            >
              {library.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}