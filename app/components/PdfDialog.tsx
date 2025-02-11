import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import ResumePDF from './ResumePdf'

interface PdfDialogProps {
  resume: any // Replace 'any' with a specific type for better type safety
}

export function PdfDialog({ resume }: PdfDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Generate PDF</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[800px] pt-12'>
        <DialogHeader>
          <DialogTitle className='sr-only'>Resume Preview</DialogTitle>
        </DialogHeader>
        <ResumePDF resume={resume} />
      </DialogContent>
    </Dialog>
  )
}
