import React from 'react';
import Icon from '../ui/Icon';

const Button: React.FC<{ variant?: 'solid' | 'outline', color?: string, icon?: string, children: React.ReactNode, isPrimary?: boolean }> = ({ variant = 'solid', color, icon, children, isPrimary = false }) => {
    const baseClasses = "px-4 py-2 rounded-lg transition-colors duration-200";
    
    let colorClasses = '';

    if (isPrimary) {
        if (variant === 'solid') {
            colorClasses = 'bg-primary hover:bg-primary-hover text-text-on-primary';
        } else {
            colorClasses = 'border border-primary text-primary hover:bg-primary hover:text-text-on-primary';
        }
    } else {
        const solidClasses = {
            gray: "bg-gray-500 hover:bg-gray-600 text-white",
            green: "bg-green-500 hover:bg-green-600 text-white",
            red: "bg-red-500 hover:bg-red-600 text-white",
            yellow: "bg-yellow-500 hover:bg-yellow-600 text-white",
            indigo: "bg-indigo-500 hover:bg-indigo-600 text-white",
        };
        const outlineClasses = {
            gray: "border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white",
            green: "border border-green-500 text-green-500 hover:bg-green-500 hover:text-white",
            red: "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
            yellow: "border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white",
            indigo: "border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white",
        };
        colorClasses = variant === 'solid' ? (solidClasses as any)[color || 'gray'] : (outlineClasses as any)[color || 'gray'];
    }


    return (
        <button className={`${baseClasses} ${colorClasses} ${icon ? 'flex items-center gap-2' : ''}`}>
            {icon && <Icon name={icon} className="w-5 h-5" />}
            {children}
        </button>
    );
}

const Buttons: React.FC = () => {
    return (
        <div className="p-6 space-y-6">
            <div>
                <h4 className="font-semibold mb-2">Standard Buttons</h4>
                <div className="flex flex-wrap gap-4">
                    <Button isPrimary={true}>Primary</Button>
                    <Button color="gray">Secondary</Button>
                    <Button color="green">Success</Button>
                    <Button color="red">Danger</Button>
                    <Button color="yellow">Warning</Button>
                    <Button color="indigo">Info</Button>
                </div>
            </div>
            <div>
                <h4 className="font-semibold mb-2">Outline Buttons</h4>
                <div className="flex flex-wrap gap-4">
                    <Button variant="outline" isPrimary={true}>Primary</Button>
                    <Button variant="outline" color="gray">Secondary</Button>
                    <Button variant="outline" color="green">Success</Button>
                    <Button variant="outline" color="red">Danger</Button>
                    <Button variant="outline" color="yellow">Warning</Button>
                    <Button variant="outline" color="indigo">Info</Button>
                </div>
            </div>
            <div>
                <h4 className="font-semibold mb-2">Buttons with Icons</h4>
                <div className="flex flex-wrap gap-4">
                    <Button isPrimary={true} icon="home">Home</Button>
                    <Button variant="outline" color="gray" icon="settings">Settings</Button>
                    <Button color="green" icon="check">Submit</Button>
                </div>
            </div>
        </div>
    );
};

export default Buttons;