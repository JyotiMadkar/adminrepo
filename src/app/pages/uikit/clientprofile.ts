import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { Customer, CustomerService, Representative } from '../service/customer.service';
import { Product, ProductService } from '../service/product.service';
import {ObjectUtils} from "primeng/utils";
import { Fluid } from "primeng/fluid";
import { Profile } from '../model/Profile';
import { ProfileService } from '../service/profileservice';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';

interface expandedRows {
    [key: string]: boolean;
}
@Component({
    selector: 'app-client-profile',
    standalone: true,
    imports: [
    ReactiveFormsModule,
    TableModule,
    MultiSelectModule,
    CheckboxModule,
    SelectModule,
    RadioButtonModule,
    InputIconModule,
    TagModule,
    InputTextModule,
    SliderModule,
    ProgressBarModule,
    ToggleButtonModule,
    ToastModule,
    MessageModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    RatingModule,
    RippleModule,
    DialogModule,
    IconFieldModule
   
],
    template: ` <div class="card">
            <div class="font-semibold text-xl mb-4">Client Profile</div>
            <p-table
            #dt1
                [value]="profiles"
                dataKey="id"
                [rows]="10"
                [loading]="loading"
                [rowHover]="true"
                [showGridlines]="true"
                [paginator]="true"
                filterMode="menu"
                [globalFilterFields]="['apiProfileId', 'companyName', 'cisNumber', 'dcarNumber', 'profileStatus', 'profileState', 'clientType', 'productType']"
                responsiveLayout="scroll"
            >
                <ng-template #caption>
                    <div class="flex justify-between items-center flex-column sm:flex-row">
                        <button pButton label="Clear" class="p-button-outlined mb-2" icon="pi pi-filter-slash" (click)="clear(dt1)"></button>
                        <button pButton label="Show" class="p-button-outlined mb-2" icon="pi pi-filter-view" [style]="{ width: 'auto' }" (click)="open()"></button>
                        <p-iconfield iconPosition="left" class="ml-auto">
                            <p-inputicon>
                                <i class="pi pi-search"></i>
                            </p-inputicon>
                            <input pInputText type="text" (input)="onGlobalFilter(dt1, $event)" placeholder="Search keyword" /> 
                      

                        </p-iconfield>
                    </div>
                </ng-template>
                
                <ng-template #header>
                <tr>
                    <th style="min-width: 8rem">
                        <div class="flex justify-between items-center">
                            API Profile ID
                            <p-columnFilter type="text" field="apiProfileId" display="menu" placeholder="Search by name"></p-columnFilter>
                        </div>
                    </th>
                    <th style="min-width: 5rem">
                        <div class="flex justify-between items-center">
                            Company Name
                            <p-columnFilter type="text" field="companyName" display="menu" placeholder="Search by company "></p-columnFilter>
                        </div>
                    </th>
                    <th style="min-width: 5rem">
                        <div class="flex justify-between items-center">
                            CIS Number
                            <p-columnFilter type="text" field="cisNumber" display="menu" placeholder="Search by company "></p-columnFilter>
                        </div>
                    </th>
                    <th style="min-width: 5rem">
                        <div class="flex justify-between items-center">
                            DCAR Number
                            <p-columnFilter type="text" field="dcarNumber" display="menu" placeholder="Search by company "></p-columnFilter>
                        </div>
                    </th>
                    <!-- <th style="min-width: 12rem">
                        <div class="flex justify-between items-center">
                            Profile Status
                            <p-columnFilter type="text" field="profileStatus" display="menu" placeholder="Search by company "></p-columnFilter>
                        </div>
                    </th> -->
                    <th style="min-width: 5rem">
                        <div class="flex justify-between items-center">
                            <span>Profile Status</span>
                            <p-columnFilter
                            type="text"
                            field="profileStatus"
                            display="menu"
                            placeholder="Search by status"
                            matchMode="contains">
                            </p-columnFilter>
                        </div>
                    </th>
                    <th style="min-width: 5rem">
                        <div class="flex justify-between items-center">
                            Profile State
                            <p-columnFilter type="text" field="profileState" display="menu" placeholder="Search by company "></p-columnFilter>
                        </div>
                    </th>
                    <th style="min-width: 5rem">
                        <div class="flex justify-between items-center">
                            Client Type
                            <p-columnFilter type="text" field="clientType" display="menu" placeholder="Search by company "></p-columnFilter>
                        </div>
                    </th>
                    <th style="min-width: 5rem">
                        <div class="flex justify-between items-center">
                            Product Type
                            <p-columnFilter type="text" field="productType" display="menu" placeholder="Search by company "></p-columnFilter>
                        </div>
                    </th>
                    <th style="min-width: 4rem">
                        <div class="flex justify-between items-center">
                            Market Sector
                            <p-columnFilter type="text" field="marketSector" display="menu" placeholder="Search by company "></p-columnFilter>
                        </div>
                    </th>
                    <th style="min-width: 8rem">
                        <div class="flex justify-between items-center">
                            Status
                            <p-columnFilter type="text" field="marketSector" display="menu" placeholder="Search by company "></p-columnFilter>
                        </div>
                    </th>
                   
                </tr>
            </ng-template>
                <ng-template #body let-profiles let-rowIndex="rowIndex">
                    <tr>
                        <td>
                            {{ profiles.apiProfileId }}
                        </td>
                        <td>
                            {{ profiles.companyName }}
                        </td>
                       <td>
                            {{ profiles.cisNumber }}
                        </td>
                        <td>
                            {{ profiles.dcarNumber }}
                        </td>
                        <td>
                            {{ profiles.profileStatus }}
                        </td>
                        <td>
                            {{ profiles.profileState }}
                        </td>
                        <td>
                            {{ profiles.clientType }}
                        </td>
                        <td>
                            {{ profiles.productType }}
                        </td>
                        <td>
                            {{ profiles.marketSector }}
                        </td>
                        <td class="text-primary">
                            <button pButton type="button" icon="pi pi-pencil" (click)="editRow(profiles.id)" [style]="{ marginRight: '4px' }"></button>
                            <button pButton type="button" icon="pi pi-trash" class="p-button-danger" (click)="deleteRow(profiles.id)"></button>
                        </td>
                    </tr>
                </ng-template>
               
                <ng-template #emptymessage>
                    <tr>
                        <td colspan="8">No customers found.</td>
                    </tr>
                </ng-template>
                <ng-template #loadingbody>
                    <tr>
                        <td colspan="8">Loading customers data. Please wait.</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
       
        <div class="md:w-1/2">
            <div class="card">
                <p-dialog header="Create Client Profile" [(visible)]="display" [breakpoints]="{ '960px': '75vw' }" [style]="{ width: '60vw' }" [modal]="true" >
                <form>
                    <!-- Profile Details -->
                    <div class="font-semibold text-xl">Profile Details</div>
                    <div class="flex flex-wrap gap-6">
                        <div class="flex flex-col grow basis-0 gap-2">
                        <label for="apiProfileId">API Profile ID</label>
                        <input pInputText id="apiProfileId" [(ngModel)]="profile.apiProfileId" [ngModelOptions]="{standalone: true}" name="apiProfileId" type="text" />
                        </div>
                        <div class="flex flex-col grow basis-0 gap-2">
                        <label for="prefix">Prefix</label>
                        <input pInputText id="prefix" [(ngModel)]="profile.prefix" [ngModelOptions]="{standalone: true}" type="text" />
                        </div>
                    </div>

                    <!-- General Info -->
                    <div class="font-semibold text-xl">General Info</div>
                    <div class="flex flex-wrap gap-6">
                        <div class="flex flex-col grow basis-0 gap-2">
                        <label for="companyName">Company Name</label>
                        <input pInputText id="companyName" [(ngModel)]="profile.companyName" [ngModelOptions]="{standalone: true}"  type="text" />
                        </div>
                        <div class="flex flex-col grow basis-0 gap-2">
                        <label for="cisNumber">CIS Number</label>
                        <input pInputText id="cisNumber" [(ngModel)]="profile.cisNumber" [ngModelOptions]="{standalone: true}" type="text" />
                        </div>
                        <div class="flex flex-col grow basis-0 gap-2">
                        <label for="dcarNumber">DCAR Number</label>
                        <input pInputText id="dcarNumber" [(ngModel)]="profile.dcarNumber" [ngModelOptions]="{standalone: true}" type="text" />
                        </div>
                        <div class="flex flex-col grow basis-0 gap-2">
                        <label for="registrationNumber">Registration Number</label>
                        <input pInputText id="registrationNumber" [(ngModel)]="profile.registrationNumber" [ngModelOptions]="{standalone: true}" type="text" />
                        </div>
                        <div class="flex flex-col grow basis-0 gap-2">
                        <label for="marketSector">Market Sector</label>
                        <p-select [options]="dropdownValues" optionLabel="name" [(ngModel)]="profile.marketSector" [ngModelOptions]="{standalone: true}" placeholder="Select" />
                        </div>
                        <div class="flex flex-col grow basis-0 gap-2">
                        <label for="profileStatus">Profile Status</label>
                        <input pInputText id="profileStatus" [(ngModel)]="profile.profileStatus" [ngModelOptions]="{standalone: true}" type="text" />
                        </div>
                        <div class="flex flex-col grow basis-0 gap-2">
                        <label for="profileState">Profile State</label>
                        <input pInputText id="profileState" [(ngModel)]="profile.profileState" [ngModelOptions]="{standalone: true}" type="text" />
                        </div>
                    </div>

                    
                    <div class="flex flex-wrap gap-6">
                        <!-- Client Type -->
                        <div class="flex flex-col grow basis-0 gap-2">
                            <label for="clientType">Client Type</label>
                            <div class="flex flex-col md:flex-row gap-4">
                                <div class="flex items-center">
                                    <p-radiobutton name="clientType" value="Internal" [(ngModel)]="profile.clientType" [ngModelOptions]="{standalone: true}" inputId="internal" /> 
                                    <label for="internal" class="ml-2">Internal</label>
                                </div>
                                <div class="flex items-center">
                                    <p-radiobutton name="clientType" value="External" [(ngModel)]="profile.clientType" [ngModelOptions]="{standalone: true}" inputId="external" />
                                    <label for="external" class="ml-2">External</label>
                                </div>
                            </div>
                        </div>
                        <!-- Product Type -->
                        <div class="flex flex-col grow basis-0 gap-2">
                            <label for="productType">Product Type</label>
                            <div class="flex flex-col md:flex-row gap-4">
                            <div class="flex items-center">
                                <!-- <p-checkbox value="EFT"  />
                                <label class="ml-2">EFT</label> -->
                                <p-checkbox [(ngModel)]="isEFTSelected" [binary]="true" name="productType" />
                                <label class="ml-2">EFT</label>
                                <label class="ml-2">EFT</label>
                            </div>
                            </div>
                        </div>
                    </div>

                    <!-- Connectivity -->
                    <div class="font-semibold text-xl">Connectivity</div>
                    <div class="flex flex-wrap gap-6">
                        <div class="flex flex-col grow basis-0 gap-2">
                        <label for="connectDirectAdd">Connect Direct Address</label>
                        <input pInputText id="connectDirectAdd" [(ngModel)]="profile.connectDirectAdd" [ngModelOptions]="{standalone: true}"  type="text" />
                        </div>
                        <div class="flex flex-col grow basis-0 gap-2">
                        <label for="connectDirectFileType">Connect Direct File Type</label>
                        <input pInputText id="connectDirectFileType" [(ngModel)]="profile.connectDirectFileType" [ngModelOptions]="{standalone: true}" type="text" />
                        </div>
                    </div>

                    <!-- Contact Details -->
                    <div class="font-semibold text-xl">Contact Details</div>
                    <div class="flex flex-wrap gap-6">
                        <div class="flex flex-col grow basis-0 gap-2">
                        <label for="physicalAddress">Physical Address</label>
                        <input pInputText id="physicalAddress" type="text" />
                        </div>
                        <div class="flex flex-col grow basis-0 gap-2">
                        <label for="postalAddress">Postal Address</label>
                        <input pInputText id="postalAddress"  type="text" />
                        </div>
                        <div class="flex flex-col grow basis-0 gap-2">
                        <label for="telephoneNumber">Telephone Number</label>
                        <input pInputText id="telephoneNumber"  type="text" />
                        </div>
                        <div class="flex flex-col grow basis-0 gap-2">
                        <label for="emailAddress">Email Address</label>
                        <input pInputText id="emailAddress"  type="text" />
                        </div>
                        <div class="flex flex-col grow basis-0 gap-2">
                        <label for="faxNumber">Fax Number</label>
                        <input pInputText id="faxNumber"  type="text" />
                        </div>
                    </div>

                    <!-- Save Button -->
                    <div class="mt-4">
                        <p-button label="Save" type="submit" />
                    </div>
                    </form>
                </p-dialog>
               
            </div>
        </div>
        <p-toast></p-toast>

         `, 

    styles: `
        .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        .p-datatable-scrollable .p-frozen-column {
            font-weight: bold;
        }
    `,
    providers: [ConfirmationService, MessageService, CustomerService, ProductService]
})
export class ClientProfile implements OnInit {
    profile: Profile = new Profile();
   
    
        isExpanded: boolean = false;
    
        balanceFrozen: boolean = false;
    
        loading: boolean = true;
        tableData: any[]=[];
        items: any[] = [];
         profiles: Profile[] = [];
         searchTerm = new Subject<string>();

        formData = {
            apiProfileId: '',
            prefix: '',
            companyName: '',
            cisNumber: '',
            dcarNumber: '',
            registrationNumber: '',
            marketSector: null,
            profileStatus: '',
            profileState: '',
            clientType: '',
            productType: '',
            connectDirectAdd: '',
            connectDirectFileType: '',
            physicalAddress: '',
            postalAddress: '',
            telephoneNumber: '',
            emailAddress: '',
            faxNumber: ''
        };

    
        @ViewChild('filter') filter!: ElementRef;
        dt1: any;
        table: any;
    productType: any;
    
        constructor(  private profileService: ProfileService,
            private service: MessageService,
            private fb: FormBuilder
         ) {}
    
        ngOnInit() {
             this.profileService.getData().subscribe((data) => {
                this.profiles = data;
                this.loading = false;
            
            });
            // this.profileForm = this.fb.group({
            //     apiProfileId: [''],
            //     prefix: [''],
            //     companyName: [''],
            //     cisNumber: [''],
            //     dcarNumber: [''],
            //     registrationNumber: [''],
            //     marketSector: [null],
            //     profileStatus: [''],
            //     profileState: [''],
            //     clientType: [''],
            //     productType: [''],
            //     connectDirectAdd: [''],
            //     connectDirectFileType: [''],
            //     physicalAddress: [''],
            //     postalAddress: [''],
            //     telephoneNumber: [''],
            //     emailAddress: [''],
            //     faxNumber: ['']
            //     });

                     
         }
        submitForm() {
            console.log(this.profileForm.value);
        }
        onGlobalFilter(table: Table, event: Event) {
            table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
        }

    
        clear(table: Table) {
            table.clear();
            this.filter.nativeElement.value = '';
        }
    
       
        //To hide and show the modal
        display: boolean = false;
        open() {
        this.display = true;
        }

        close() {
            this.display = false;
        }

        //edit a profile
        profileForm!: FormGroup;

        selectedProfile: any;

        editRow(id: number) {
            this.loading = true;
            this.profileService.getUser(id).subscribe({
                next: (response: Profile) => {
                this.profile = response; // Use the actual response
                this.display = true;     // Show form after data is ready
                this.loading = false;
                this.productType= [this.profile.productType === 'EFT'];
                console.log(this.profile.marketSector);
                },
                error: (err) => {
                console.error("Error fetching user profile", err);
                this.loading = false;
                }
            });
            
        }
        onSave() {
            console.log('Updated profile:', this.profileForm.value);
            // Optionally send to backend via service
        }

       get isEFTSelected(): boolean {
            return this.profile.productType === 'EFT';
        }

        set isEFTSelected(value: boolean) {
              this.profile.productType = value ? 'EFT' : undefined;
        }


        

       //Delete a selected profile
        deleteRow(id: number) {
            this.profileService.deleteUser(id).subscribe({
            next: () => {
                this.profiles = this.profiles.filter(profile => profile.id !== id);
                this.profiles.splice(id, 1);
                this.profiles = [...this.profiles];
                this.service.add({ severity: 'success', summary: 'Success', detail: 'Profile deleted successfully', life: 3000 });
               
            },
            error: err => {
                console.error('Delete failed', err);
                this.service.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong', life: 3000 });
            }
            });
        }

        dropdownValue: any = null;
        dropdownValues = [
            { name: 'NBB', code: 'NY' },
            { name: 'NAR', code: 'RM' },
            { name: 'NCB', code: 'LDN' }
        ];

        // clientType: any = null;
        // clientTypes = [
        //     { name: 'Internal', code: 'NY' },
        //     { name: 'External', code: 'RM' }
        // ];

        checkboxValue: any[] = [];
        radioValue: any = null;
    }

function $any(target: EventTarget | null) {
    throw new Error('Function not implemented.');
}
