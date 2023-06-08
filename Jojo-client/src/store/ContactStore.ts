import { Store } from 'pullstate';

const ContactStore = new Store({

	contacts: [
        {
            id: 1,
			name: "Elon Musk",
			avatar: "/assets/elon.jpeg"
		},
        {
            id: 2,
			name: "Bill Gates",
			avatar: "/assets/bill.jpeg"
		},
	]
});

export default ContactStore;