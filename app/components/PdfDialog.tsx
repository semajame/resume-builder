import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { PDFDownloadLink } from '@react-pdf/renderer'
import ResumePDF, { ResumeDocument } from './ResumePdf'

interface PdfDialogProps {
  resume: any
}

export function PdfDialog({ resume }: PdfDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Generate PDF</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px] '>
        <DialogHeader>
          <DialogTitle className='sr-only'>Resume Preview</DialogTitle>
        </DialogHeader>
        <ResumePDF resume={resume} />
        <div className='flex justify-between mt-4 gap-4'>
          <DialogClose asChild>
            <Button type='button' variant='secondary' className='w-full'>
              Close
            </Button>
          </DialogClose>
          <PDFDownloadLink
            document={<ResumeDocument resume={resume} />}
            fileName='resume.pdf'
            className=' text-center w-full'
          >
            {({ loading }) =>
              loading ? (
                <Button disabled className='w-full'>
                  Loading...
                </Button>
              ) : (
                <Button className='w-full'>Download PDF</Button>
              )
            }
          </PDFDownloadLink>
        </div>
      </DialogContent>
    </Dialog>
  )
}
