import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace com.neverest.co.ke{
   export class Land extends Asset {
      landId: string;
      landRefNo: string;
      location: string;
      size: string;
      ownerId: string;
   }
   export class Account extends Asset {
      accountId: string;
   }
   export class LandOwner extends Participant {
      ownerId: string;
      firstName: string;
      lastName: string;
      IdNumber: string;
      PhoneNumber: string;
   }
   export class LegalBody extends Participant {
      legalId: string;
   }
   export class LandTransfer extends Transaction {
      from: LandOwner;
      to: LandOwner;
      land: Land;
   }
// }
