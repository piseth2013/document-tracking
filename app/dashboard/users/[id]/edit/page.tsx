import {fetchUsersById} from '@/app/lib/data';
import {Metadata} from "next";
import Breadcrumbs from '@/app/ui/customers/breadcrumbs';
import Form from '@/app/ui/users/edit-form';

export const metadata: Metadata = {
    title: 'Edit User',
}

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;

    const [users] = await Promise.all([ fetchUsersById(id)]);


    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Users', href: '/dashboard/users' },
                    {
                        label: 'Edit users',
                        href: `/dashboard/users/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form users={users}  />
        </main>
    );
}
