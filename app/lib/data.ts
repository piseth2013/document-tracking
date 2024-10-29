import {formatCurrency} from './utils';
import connectionDb from "@/app/lib/connectionDb";
import Revenue from '@/app/models/Revenue';
import Invoice from "@/app/models/Invoice";
import Customer from "@/app/models/Customer";
import User from "@/app/models/User";


export async function fetchRevenue() {
  try {
    await connectionDb();

    // Fetch data from MongoDB
    return await Revenue.find({});
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}


export async function fetchLatestInvoices() {
  try {
    await connectionDb();


    const data = await Invoice.aggregate([
      {
        $lookup: {
          from: 'customers',
          localField: 'customer_id',
          foreignField: '_id',
          as: 'customer_details'
        }
      },
      { $unwind: '$customer_details' },
      { $sort: { date: -1 } },
      { $limit: 5 },
      {
        $project: {
          amount: 1,
          'customer_details.name': 1,
          'customer_details.image_url': 1,
          'customer_details.email': 1,
          id: '$_id'
        }
      }
    ]);

    return data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount)
    }));

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}


export async function fetchCardData() {
  try {
    await connectionDb();

    // Fetching data in parallel
    const [
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ] = await Promise.all([
      Invoice.countDocuments({}),
      Customer.countDocuments({}),
      Invoice.aggregate([
        {
          $group: {
            _id: null,
            paid: { $sum: { $cond: [{ $eq: ["$status", "paid"] }, "$amount", 0] } },
            pending: { $sum: { $cond: [{ $eq: ["$status", "pending"] }, "$amount", 0] } },
          }
        }
      ]),
    ]);

    const numberOfInvoices = invoiceCountPromise;
    const numberOfCustomers = customerCountPromise;
    const totalPaidInvoices = formatCurrency(invoiceStatusPromise[0]?.paid ?? 0);
    const totalPendingInvoices = formatCurrency(invoiceStatusPromise[0]?.pending ?? 0);

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 10;
export async function fetchInvoiceById(id: string) {

  try {
    await connectionDb();

    // Fetch data from MongoDB
    const invoice = await Invoice.findById(id);

    if (!invoice) {
     return {message: 'Invoice not found'}
    }

    return invoice;


  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}


export async function fetchCustomers() {
  try {
    await connectionDb();

    // Fetch data from MongoDB
    return await Customer.find();
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}
export async function fetchCustomerById(id: string) {
  try {
    await connectionDb();

    // Fetch data from MongoDB
    return await Customer.findById(id);
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer.');
  }
}
export async function fetchUsersById(id: string) {
  try {
    await connectionDb();

    // Fetch data from MongoDB
    return await User.findById(id);
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer.');
  }
}

// customer
export async function fetchCustomersPages(query: string) {
  const ITEMS_PER_PAGE = 10; // Define your ITEMS_PER_PAGE if not already defined

  try{
    await connectionDb();

    const count = await Customer.aggregate([
      {
        $match: {
          $or: [
            { 'name': { $regex: query, $options: 'i' } },
            { 'email': { $regex: query, $options: 'i' } },
          ]
        }
      },
      { $count: 'total' }
    ]);

    return Math.ceil(Number(count[0]?.total ?? 0) / ITEMS_PER_PAGE);

  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of customers.');
  }
}

export async function fetchFilteredCustomers(query: string, currentPage: number) {

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    await connectionDb();

    // Fetch data from MongoDB
    return await Customer.aggregate([
      {
        $match: {
          $or: [
            { 'name': { $regex: query, $options: 'i' } },
            { 'email': { $regex: query, $options: 'i' } },
          ]
        }
      },
      { $skip: offset },
      { $limit: ITEMS_PER_PAGE },
    ])
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customers.');
  }

}

//Filter User
export async function fetchFilteredUsers(query: string, currentPage: number) {

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    await connectionDb();

    // Fetch data from MongoDB
    return await User.aggregate([
      {
        $match: {
          $or: [
            { 'name': { $regex: query, $options: 'i' } },
            { 'email': { $regex: query, $options: 'i' } },
          ]
        }
      },
      { $skip: offset },
      { $limit: ITEMS_PER_PAGE },
    ])
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch users.');
  }

}
