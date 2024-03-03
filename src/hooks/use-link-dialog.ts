import { ActionResult } from "@/actions"
import { useEffect, useState } from "react"

export const useLinkDialog = (formState: ActionResult) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
		if (formState.linkPayload) {
            setOpen(true)
		}
	}, [formState.linkPayload]);


  return {open, setOpen}
}