import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
    public dropFile: any;
    public fileUrl: string;
    public fileSelected = false;
    public resultUrl: any;
    public path: string;
    acceptedMimeTypes = [
        "image/jpeg",
        "image/gif",
        "image/png"
    ];

    public infoText: string;
    @ViewChild("fileInput", { static: false }) fileInput: ElementRef;
    fileDataUri: any;
    skipBackgroungImage: any;
    errorMsg = "";
    constructor() { }

    ngOnInit(): void {
    }

    previewFile() {
        let file: any;
        if (this.dropFile) {
            file = this.dropFile;
        } else {
            file = this.fileInput.nativeElement.files[0];
        }
        if (file && this.validateFile(file)) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.resultUrl = reader.result;
                this.fileSelected = true;
                this.sendFile();
                this.dropFile = null;
            };

        } else {
            this.infoText = "fileMustBe";
            this.fileSelected = false;
        }
    }

    uploadFile(event: Event) {
        console.log("submit");
        event.preventDefault();
        this.sendFile();
    }

    private sendFile() {
        if (this.resultUrl.length > 0 && this.fileSelected === true) {
            const base64File = this.resultUrl.split(",")[1];
            console.log("sending file ",base64File);
        }

    }

    validateFile(file) {
        return this.acceptedMimeTypes.includes(file.type) && file.size < 500000;
    }

    onDrop($event) {
        $event.preventDefault();
        const transfer = $event.dataTransfer;
        const ourFile = transfer.files[0];
        this.dropFile = ourFile;
        this.previewFile();
    }
    onDragOver(event) {
        event.stopPropagation();
        event.preventDefault();
    }

}
