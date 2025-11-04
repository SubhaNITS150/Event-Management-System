// import * as React from "react";
// import { Slot } from "@radix-ui/react-slot";
// import { cva } from "class-variance-authority";

// import { cn } from "../../lib/utils";

// const buttonVariants = cva(
//   "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2",
//   {
//     variants: {
//       variant: {
//         default: "bg-primary text-primary-foreground border border-primary-border",
//         destructive: "bg-destructive text-destructive-foreground border border-destructive-border",
//         outline:
//           "border [border-color:var(--button-outline)] shadow-xs active:shadow-none",
//         secondary:
//           "border bg-secondary text-secondary-foreground border border-secondary-border",
//         ghost: "border border-transparent",
//       },
//       size: {
//         default: "min-h-9 px-4 py-2",
//         sm: "min-h-8 rounded-md px-3 text-xs",
//         lg: "min-h-10 rounded-md px-8",
//         icon: "h-9 w-9",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   }
// );

// const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
//   const Comp = asChild ? Slot : "button";
//   return (
//     <Comp
//       className={cn(buttonVariants({ variant, size, className }))}
//       ref={ref}
//       {...props}
//     />
//   );
// });

// Button.displayName = "Button";

// export { Button, buttonVariants };
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 transition-all duration-150 ease-in-out",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border border-primary-border",
        destructive:
          "bg-destructive text-destructive-foreground border border-destructive-border",
        outline:
          "border [border-color:var(--button-outline)] shadow-xs active:shadow-none",
        secondary:
          "border bg-secondary text-secondary-foreground border border-secondary-border",
        ghost: "border border-transparent",
      },
      size: {
        // ↓ Adjusted paddings here
        default: "min-h-[2.25rem] px-6 py-1.5 text-base", // shorter height, wider button
        sm: "min-h-[1.75rem] px-4 text-sm",
        lg: "min-h-[2.75rem] px-10 text-lg", // wider and slightly flatter large button
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
